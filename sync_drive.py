#!/usr/bin/env python3
"""Récupère les PDF du dossier Drive public et note lesquels sont déjà dans une fiche."""

import json
import re
import subprocess
from datetime import datetime
from pathlib import Path
from urllib.request import Request, urlopen

FOLDER_ID = "1Hf0Bhup5K98DuPfMqAYCZ0nri-MregCO"
FOLDER_URL = (
    "https://drive.google.com/drive/folders/"
    "1Hf0Bhup5K98DuPfMqAYCZ0nri-MregCO?usp=sharing"
)

ROOT = Path(__file__).resolve().parent
DRIVE = ROOT / "drive"
FILES = DRIVE / "files"
FICHES_PATH = DRIVE / "fiches.json"
STATUS_PATH = DRIVE / "status.json"


def fetch(url: str) -> bytes:
    request = Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urlopen(request, timeout=60) as response:
        return response.read()


def list_folder() -> tuple[str, list[dict]]:
    html = fetch(
        f"https://drive.google.com/embeddedfolderview?id={FOLDER_ID}"
    ).decode("utf-8", "replace")
    title = re.search(r"<title>([^<]+)</title>", html)
    folder_name = title.group(1).strip() if title else "ruben_college_3a"
    ids = []
    for file_id in re.findall(r"/file/d/([A-Za-z0-9_-]+)", html):
        if file_id not in ids:
            ids.append(file_id)
    names = re.findall(r'class="flip-entry-title">([^<]*)', html)
    files = []
    for index, file_id in enumerate(ids):
        name = names[index].strip() if index < len(names) and names[index].strip() else file_id
        files.append({"id": file_id, "name": name})
    return folder_name, files


def download(file_id: str, dest: Path) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    url = f"https://drive.google.com/uc?export=download&id={file_id}"
    subprocess.check_call(
        ["curl", "-fsSL", "-A", "Mozilla/5.0", "-L", url, "-o", str(dest)],
    )
    if dest.read_bytes()[:5] == b"%PDF-":
        return
    text = dest.read_text(errors="replace")
    confirm = re.search(r"confirm=([0-9A-Za-z_]+)", text)
    if not confirm:
        raise SystemExit(f"Téléchargement impossible pour {file_id}")
    confirmed = (
        "https://drive.google.com/uc?export=download"
        f"&confirm={confirm.group(1)}&id={file_id}"
    )
    subprocess.check_call(
        ["curl", "-fsSL", "-A", "Mozilla/5.0", "-L", confirmed, "-o", str(dest)],
    )
    if dest.read_bytes()[:5] != b"%PDF-":
        raise SystemExit(f"Le fichier {file_id} n’est pas un PDF")


def page_count(pdf: Path) -> int:
    output = subprocess.check_output(["pdfinfo", str(pdf)], text=True)
    match = re.search(r"^Pages:\s+(\d+)", output, re.M)
    return int(match.group(1)) if match else 0


def render(pdf: Path, dest_dir: Path) -> None:
    dest_dir.mkdir(parents=True, exist_ok=True)
    subprocess.check_call(
        ["pdftoppm", "-png", "-r", "140", str(pdf), str(dest_dir / "page")],
    )


def main() -> None:
    folder_name, remote_files = list_folder()
    fiches = json.loads(FICHES_PATH.read_text(encoding="utf-8")) if FICHES_PATH.exists() else {}
    listed = []

    for item in remote_files:
        file_id = item["id"]
        pdf = FILES / file_id / f"{file_id}.pdf"
        pages_dir = FILES / file_id / "pages"
        if not pdf.exists():
            download(file_id, pdf)
        pages = page_count(pdf)
        existing = list(pages_dir.glob("page-*.png")) if pages_dir.exists() else []
        if len(existing) != pages:
            render(pdf, pages_dir)
        known = fiches.get(file_id, {})
        listed.append(
            {
                "id": file_id,
                "name": item["name"],
                "pages": pages,
                "status": known.get("status", "nouveau"),
                "fiche": known.get("fiche", ""),
            }
        )

    status = {
        "folderName": folder_name,
        "folderUrl": FOLDER_URL,
        "syncedAt": datetime.now().astimezone().isoformat(timespec="minutes"),
        "files": listed,
    }
    STATUS_PATH.write_text(
        json.dumps(status, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    print(json.dumps(status, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
