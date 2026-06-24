#!/usr/bin/env python3
from pathlib import Path
import shutil


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "dist" / "pages-preview"

STATIC_FILES = [
  "assets/demo-screenshot.jpg"
]


def assert_true(condition, message):
  if not condition:
    raise AssertionError(message)


def copy_file(relative):
  source = ROOT / relative
  target = OUT / relative
  assert_true(source.exists(), f"missing static preview source: {relative}")
  target.parent.mkdir(parents=True, exist_ok=True)
  shutil.copy2(source, target)


def main():
  build_index = ROOT / "dist" / "index.html"
  assert_true(build_index.exists(), "run `make build` before building the static preview")
  if OUT.exists():
    shutil.rmtree(OUT)
  OUT.mkdir(parents=True)

  for source in (ROOT / "dist").iterdir():
    if source.name == "pages-preview":
      continue
    target = OUT / source.name
    if source.is_dir():
      shutil.copytree(source, target)
    else:
      shutil.copy2(source, target)

  for relative in STATIC_FILES:
    copy_file(relative)

  index = (OUT / "index.html").read_text(encoding="utf-8")
  assert_true("/assets/" in index, "static preview index should reference Vite assets")
  assert_true((OUT / "assets" / "demo-screenshot.jpg").exists(), "static preview should include screenshot asset")

  print(f"Static preview built at {OUT.relative_to(ROOT)}")
  print(f"Included {len(STATIC_FILES)} files")


if __name__ == "__main__":
  main()
