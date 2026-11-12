# Portfolio Introduction

This folder contains the portfolio introduction page and the visual assets used for its featured project covers.

## Purpose

The **Portfolio Introduction** page presents selected projects in the Jelvan R. portfolio. Project covers are intended to show the desktop application experience. Where a project-specific desktop screen asset is available, the page embeds that asset in the featured cover area.

## Project cover assets

The following HTML files provide desktop Mac-screen presentations and are used by the matching project covers in `index.html`:

| Project | Desktop cover asset |
| --- | --- |
| LeadMASTER | `assets/Leadmaster-Mac-Screen.html` |
| Jels Kitchenwares | `assets/Jels-Kitchenwares-Mac-Screen.html` |
| HR Information System | `assets/Jelhr-Mac-Screen.html` |
| Master AI — Multi-Agent Workspace | `assets/Xcoder-Mac-Screen.html` |
| Knowledge Center System | `assets/Discovery-Mac-Screen.html` |
| BOLEKpad | `assets/Bolekpad-Mac-Screen.html` |

PROCTORAVA uses its existing desktop cover image in the introduction page. Other projects retain their existing cover artwork when no matching desktop screen asset is available.

## Folder structure

```text
Portfolio Introduction/
├── index.html
├── README.md
└── assets/
    ├── Leadmaster-Mac-Screen.html
    ├── Jels-Kitchenwares-Mac-Screen.html
    ├── Jelhr-Mac-Screen.html
    ├── Xcoder-Mac-Screen.html
    ├── Discovery-Mac-Screen.html
    ├── Bolekpad-Mac-Screen.html
    └── ...
```

The assets directory may also contain additional image files used by the portfolio.

## Implementation notes

- Keep project-specific cover references in `index.html` aligned with the filenames in `assets/`.
- The desktop screen previews are embedded in the featured project cover area using iframes.
- Preserve the desktop-first presentation; do not add phone or mobile-device mockups to these project covers.
- Keep asset filenames and paths case-sensitive and use relative paths so the folder remains portable.
- If a project receives a new cover asset, update the corresponding project entry and this table together.

## Preview

Open `index.html` in a browser or view the folder through the repository:

[Portfolio Introduction source](https://github.com/DevJel/Jelvan-R-Portfolio/tree/main/Portfolio%20Introduction)
