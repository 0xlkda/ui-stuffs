let canvas = document.getElementById('view')

/** @type CanvasRenderingContext2D */
let ctx = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
canvas.clear = () => ctx.clearRect(0, 0, canvas.width, canvas.height)

let bubble = document.createElement('img')
bubble.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGJhc2VQcm9maWxlPSJiYXNpYyIgdmlld0JveD0iMCAwIDEwMCAxMDAiPjxjaXJjbGUgY3g9IjUyIiBjeT0iNTIiIHI9IjQ0IiBvcGFjaXR5PSIuMzUiLz48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI0NCIgZmlsbD0iI2YyZjJmMiIvPjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjM3LjUiIGZpbGw9IiM3MGJmZmYiLz48cGF0aCBmaWxsPSIjZDllZWZmIiBkPSJNMjMsNTNjLTEuNjU3LDAtMy0xLjM0My0zLTNjMC0xNi41NDIsMTMuNDU4LTMwLDMwLTMwYzEuNjU3LDAsMywxLjM0MywzLDNzLTEuMzQzLDMtMywzCWMtMTMuMjMzLDAtMjQsMTAuNzY3LTI0LDI0QzI2LDUxLjY1OCwyNC42NTcsNTMsMjMsNTN6Ii8+PHBhdGggZmlsbD0iIzQwMzk2ZSIgZD0iTTUwLDg5Yy0yMS41MDUsMC0zOS0xNy40OTUtMzktMzlzMTcuNDk1LTM5LDM5LTM5czM5LDE3LjQ5NSwzOSwzOVM3MS41MDUsODksNTAsODl6IE01MCwxNAlDMzAuMTQ5LDE0LDE0LDMwLjE1LDE0LDUwczE2LjE0OSwzNiwzNiwzNnMzNi0xNi4xNDksMzYtMzZTNjkuODUxLDE0LDUwLDE0eiIvPjwvc3ZnPg=='

let exploded = document.createElement('img')
exploded.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MCA1MCI+PHBhdGggZD0iTSAzNy45NzY1NjIgMS45NzY1NjI1IEwgMjguMDA1ODU5IDEwLjM2MTMyOCBMIDIwLjYzMjgxMiA0LjAzNzEwOTQgTCAxNy4wNTQ2ODggMTIuMDYwNTQ3IEwgMTguMDg5ODQ0IDE0LjY0NjQ4NCBMIDIxLjM2NzE4OCA3LjMwMjczNDQgTCAyNy45OTQxNDEgMTIuOTg2MzI4IEwgMzYuMjczNDM4IDYuMDIzNDM3NSBMIDM2Ljk4MjQyMiAxNS41MzcxMDkgTCA0NC40NzQ2MDkgMTEuOTMzNTk0IEwgNDIuMjczNDM4IDE4IEwgNDQuNDAwMzkxIDE4IEwgNDguMDI1MzkxIDguMDA1ODU5NCBMIDM4Ljc1NzgxMiAxMi40NjI4OTEgTCAzNy45NzY1NjIgMS45NzY1NjI1IHogTSAxMCAyIEMgOC4wOTYzODg1IDIgNi41NjU2MzggMy4zNzk1MTQgNi4xNjk5MjE5IDUuMTY5OTIxOSBDIDQuMzc5NTE0IDUuNTY1NjM4IDMgNy4wOTYzODg1IDMgOSBDIDMgMTEuMTk3MzM0IDQuODAyNjY2MSAxMyA3IDEzIEMgNy4yOTM0MjczIDEzIDcuNTY0MjEzOCAxMi45MTYzMSA3Ljg0MTc5NjkgMTIuODU1NDY5IEwgMTQuNDcyNjU2IDE1Ljg1NzQyMiBBIDEuMDAwMSAxLjAwMDEgMCAwIDAgMTUuNDU3MDMxIDE1LjkwMjM0NCBBIDEuMDAwMSAxLjAwMDEgMCAwIDAgMTUuNTQ0OTIyIDE1Ljg1MzUxNiBBIDEuMDAwMSAxLjAwMDEgMCAwIDAgMTUuNjI2OTUzIDE1Ljc5NDkyMiBBIDEuMDAwMSAxLjAwMDEgMCAwIDAgMTUuNjc1NzgxIDE1Ljc1MzkwNiBBIDEuMDAwMSAxLjAwMDEgMCAwIDAgMTUuNzE4NzUgMTUuNzEyODkxIEEgMS4wMDAxIDEuMDAwMSAwIDAgMCAxNS43ODUxNTYgMTUuNjM4NjcyIEEgMS4wMDAxIDEuMDAwMSAwIDAgMCAxNS44ODA4NTkgMTQuNTExNzE5IEwgMTQuMjY1NjI1IDEwLjQ3MjY1NiBDIDE1LjIzMDc2OSA5Ljk3MTQ4MyAxNiA5LjE1MzM1MzYgMTYgOCBDIDE2IDYuNjkzNDQwNiAxNS4wNDcwOTYgNS43NzAzMDY1IDEzLjg3MTA5NCA1LjM2MzI4MTIgQyAxMy41NTI3MyAzLjQ3NzAzMTUgMTEuOTcyMTMxIDIgMTAgMiB6IE0gMTAgNCBDIDExLjExNjY2NiA0IDEyIDQuODgzMzMzOSAxMiA2IEwgMTIgNyBMIDEzIDcgQyAxMy41NjUwMyA3IDE0IDcuNDM0OTY5OCAxNCA4IEMgMTQgOC41NjUwMzAyIDEzLjU2NTAzIDkgMTMgOSBMIDExLjUyMzQzOCA5IEwgMTMuMTUwMzkxIDEzLjA2NDQ1MyBMIDguMDQ0OTIxOSAxMC43NTE5NTMgTCA3LjY2NjAxNTYgMTAuODg2NzE5IEMgNy40NTg1MDE5IDEwLjk2MDMxIDcuMjM3MDM5OSAxMSA3IDExIEMgNS44ODMzMzM5IDExIDUgMTAuMTE2NjY2IDUgOSBDIDUgNy44ODMzMzM5IDUuODgzMzMzOSA3IDcgNyBMIDggNyBMIDggNiBDIDggNC44ODMzMzM5IDguODgzMzMzOSA0IDEwIDQgeiBNIDMuMDEzNjcxOSAxNC4xMTkxNDEgQSAxLjAwMDEgMS4wMDAxIDAgMCAwIDIuNTk5NjA5NCAxNi4wNDEwMTYgTCA0LjU5OTYwOTQgMTYuOTE2MDE2IEEgMS4wMDAxIDEuMDAwMSAwIDEgMCA1LjQwMDM5MDYgMTUuMDgzOTg0IEwgMy40MDAzOTA2IDE0LjIwODk4NCBBIDEuMDAwMSAxLjAwMDEgMCAwIDAgMy4wMTM2NzE5IDE0LjExOTE0MSB6IE0gMyAxOCBBIDEgMSAwIDAgMCAzIDIwIEEgMSAxIDAgMCAwIDMgMTggeiBNIDIxLjUzMzIwMyAxOS43NSBDIDE5Ljc3MDIwMyAxOS43NSAxOC4zODY4MTMgMjAuMzA5Njg4IDE3LjM4MjgxMiAyMS40Mjk2ODggQyAxNi4zNzg4MTMgMjIuNTQ5Njg4IDE1Ljg3Njk1MyAyNC4wNzQ5MDYgMTUuODc2OTUzIDI2LjAwMzkwNiBDIDE1Ljg3Njk1MyAyNy45MTU5MDYgMTYuMzc4ODEzIDI5LjQzNDU0NyAxNy4zODI4MTIgMzAuNTYwNTQ3IEMgMTguMzg2ODEyIDMxLjY4NjU0NyAxOS43NzAyMDMgMzIuMjQ4MDQ3IDIxLjUzMzIwMyAzMi4yNDgwNDcgQyAyMy4yOTAyMDMgMzIuMjQ4MDQ3IDI0LjY3MzU5NCAzMS42OTIwNzggMjUuNjgzNTk0IDMwLjU4MDA3OCBDIDI2LjY5MjU5NCAyOS40NjgwNzggMjcuMTk3MjY2IDI3Ljk0MzkwNiAyNy4xOTcyNjYgMjYuMDAzOTA2IEMgMjcuMTk3MjY2IDI0LjA2NDkwNiAyNi42OTI1OTQgMjIuNTM3ODc1IDI1LjY4MzU5NCAyMS40MjE4NzUgQyAyNC42NzM1OTQgMjAuMzA2ODc1IDIzLjI5MDIwMyAxOS43NSAyMS41MzMyMDMgMTkuNzUgeiBNIDYgMjAgTCA2IDMyIEwgOC45MzM1OTM4IDMyIEwgOC45MzM1OTM4IDI4LjA3NjE3MiBMIDEwLjQ3MjY1NiAyOC4wNzYxNzIgQyAxMC44OTA2NTYgMjguMDc2MTcyIDExLjI2ODQ2OSAyOC4wNDA3MDMgMTEuNjA1NDY5IDI3Ljk3MDcwMyBDIDExLjk0MjQ2OSAyNy45MDA3MDMgMTIuMjU1OTY5IDI3LjgwNDY0MSAxMi41NDI5NjkgMjcuNjgxNjQxIEMgMTIuODI5OTY5IDI3LjU1NzY0MSAxMy4wOTIwNzggMjcuNDA2NTE2IDEzLjMzMDA3OCAyNy4yMjg1MTYgQyAxMy41NjgwNzggMjcuMDUwNTE2IDEzLjc4NzMyOCAyNi44NTc0MzcgMTMuOTg2MzI4IDI2LjY0ODQzOCBDIDE0LjMxMDMyOCAyNi4zMDk0MzcgMTQuNTU4NDY5IDI1Ljg4ODgxMyAxNC43MzA0NjkgMjUuMzgyODEyIEMgMTQuOTAzNDY5IDI0Ljg3NzgxMyAxNC45OTAyMzQgMjQuMzQ2MTA5IDE0Ljk5MDIzNCAyMy43ODcxMDkgQyAxNC45OTAyMzQgMjMuMDk0MTA5IDE0Ljg3MDg1OSAyMi40OTcxNDEgMTQuNjMwODU5IDIxLjk5NDE0MSBDIDE0LjM4OTg1OSAyMS40OTIxNDEgMTQuMDQ4Mzc1IDIxLjA5MTA2MiAxMy42MDkzNzUgMjAuNzg5MDYyIEMgMTMuMjExMzc1IDIwLjUxNTA2MiAxMi43NjgyOTcgMjAuMzE1NDUzIDEyLjI3OTI5NyAyMC4xODk0NTMgQyAxMS43OTAyOTcgMjAuMDYzNDUzIDExLjIwODIwMyAyMCAxMC41MzMyMDMgMjAgTCA2IDIwIHogTSAyOCAyMCBMIDMwLjk0OTIxOSAzMiBMIDM0LjE1ODIwMyAzMiBMIDM1Ljk3MjY1NiAyNC41NzgxMjUgTCAzNy44NDE3OTcgMzIgTCA0MS4wNTA3ODEgMzIgTCA0NCAyMCBMIDQxLjA0Mjk2OSAyMCBMIDM5LjM1MzUxNiAyOC4wNTA3ODEgTCAzNy40OTgwNDcgMjAgTCAzNC41OTU3MDMgMjAgTCAzMi42NDA2MjUgMjguMDUwNzgxIEwgMzEuMDM1MTU2IDIwIEwgMjggMjAgeiBNIDIxLjU0MTAxNiAyMi4wMTU2MjUgQyAyMS44ODIwMTYgMjIuMDE1NjI1IDIyLjIwODM5MSAyMi4wODY1MTYgMjIuNTI1MzkxIDIyLjIyODUxNiBDIDIyLjg0MTM5MSAyMi4zNzE1MTYgMjMuMTI1OTUzIDIyLjYwNzU0NyAyMy4zNzY5NTMgMjIuOTM1NTQ3IEMgMjMuNjE2OTUzIDIzLjI1NjU0NyAyMy44MDkxMjUgMjMuNjY5ODc1IDIzLjk1MzEyNSAyNC4xNzE4NzUgQyAyNC4wOTcxMjUgMjQuNjc0ODc1IDI0LjE2OTkyMiAyNS4yODEwOTQgMjQuMTY5OTIyIDI1Ljk5NjA5NCBDIDI0LjE2OTkyMiAyNi43NDgwOTQgMjQuMDk5Nzk3IDI3LjM1NzI2NiAyMy45NjY3OTcgMjcuODIyMjY2IEMgMjMuODI5Nzk3IDI4LjI4NzI2NiAyMy42Mzc3MTkgMjguNjkzOTY5IDIzLjM4NjcxOSAyOS4wNDI5NjkgQyAyMy4xNTE3MTkgMjkuMzY1OTY5IDIyLjg3MDg3NSAyOS42MDM4MTMgMjIuNTQ2ODc1IDI5Ljc1NzgxMiBDIDIyLjIyMjg3NSAyOS45MTA4MTIgMjEuODg3OTY5IDI5Ljk4NjMyOCAyMS41NDI5NjkgMjkuOTg2MzI4IEMgMjEuMjAyOTY5IDI5Ljk4NjMyOCAyMC44NzM2ODcgMjkuOTE1NDM3IDIwLjU1NDY4OCAyOS43NzM0MzggQyAyMC4yMzU2ODcgMjkuNjMxNDM3IDE5Ljk1MDIxOSAyOS4zOTM1NDcgMTkuNjk5MjE5IDI5LjA2MDU0NyBDIDE5LjQ1MjIxOSAyOC43MzE1NDcgMTkuMjU4MTg3IDI4LjMyMzg5MSAxOS4xMTcxODggMjcuODM3ODkxIEMgMTguOTc2MTg3IDI3LjM1MTg5MSAxOC45MDYyNSAyNi43NDE4NTkgMTguOTA2MjUgMjYuMDA1ODU5IEMgMTguOTA2MjUgMjUuMjkwODU5IDE4Ljk4MTg1OSAyNC42NzQyMDMgMTkuMTMwODU5IDI0LjE1ODIwMyBDIDE5LjI3OTg1OSAyMy42NDMyMDMgMTkuNDc0ODQ0IDIzLjIyOTk2OSAxOS43MTQ4NDQgMjIuOTE3OTY5IEMgMTkuOTg2ODQ0IDIyLjU3OTk2OSAyMC4yNjc1NDcgMjIuMzQ0ODkxIDIwLjU2MDU0NyAyMi4yMTI4OTEgQyAyMC44NTI1NDcgMjIuMDgxODkxIDIxLjE4MDAxNiAyMi4wMTU2MjUgMjEuNTQxMDE2IDIyLjAxNTYyNSB6IE0gOC45MzM1OTM4IDIyLjI0MDIzNCBMIDkuMzQ5NjA5NCAyMi4yNDAyMzQgQyA5Ljc4MzYwOTQgMjIuMjQwMjM0IDEwLjEyNjg1OSAyMi4yNDg1NzggMTAuMzgwODU5IDIyLjI2NzU3OCBDIDEwLjYzMzg1OSAyMi4yODY1NzggMTAuOTAwNzM0IDIyLjM1OTQyMiAxMS4xNzc3MzQgMjIuNDgyNDIyIEMgMTEuMzk3NzM0IDIyLjU3NDQyMiAxMS41ODUxODcgMjIuNzQxMzI4IDExLjc0MjE4OCAyMi45ODYzMjggQyAxMS44OTkxODcgMjMuMjMxMzI4IDExLjk3NjU2MiAyMy41MjIzMjggMTEuOTc2NTYyIDIzLjg2MTMyOCBDIDExLjk3NjU2MyAyNC4yMjYzMjggMTEuOTQyMDk0IDI0LjUxNjQ2OSAxMS44NzEwOTQgMjQuNzMwNDY5IEMgMTEuODAxMDk0IDI0Ljk0NTQ2OSAxMS42NjU3OTcgMjUuMTUyNTYyIDExLjQ2Njc5NyAyNS4zNTE1NjIgQyAxMS4zNzI3OTcgMjUuNDQ3NTYzIDExLjIzNzUgMjUuNTMzMzI4IDExLjA2MjUgMjUuNjExMzI4IEMgMTAuODg3NSAyNS42ODkzMjggMTAuNzIxNDUzIDI1Ljc0MTUzMSAxMC41NjQ0NTMgMjUuNzY5NTMxIEMgMTAuMzgwNDUzIDI1LjgwMDUzMSAxMC4xNjc4NzUgMjUuODIxMTcyIDkuOTIxODc1IDI1LjgyNjE3MiBDIDkuNjc1ODc1IDI1LjgzMTE3MiA5LjQxMzcxODcgMjUuODMzOTg0IDkuMTM2NzE4OCAyNS44MzM5ODQgTCA4LjkzMzU5MzggMjUuODMzOTg0IEwgOC45MzM1OTM4IDIyLjI0MDIzNCB6IE0gNDYgMjcgQSAxIDEgMCAwIDAgNDYgMjkgQSAxIDEgMCAwIDAgNDYgMjcgeiBNIDQ0Ljk2NDg0NCAzMC45OTQxNDEgQSAxLjAwMDEgMS4wMDAxIDAgMCAwIDQ0LjU1MjczNCAzMi44OTQ1MzEgTCA0Ni41NTI3MzQgMzMuODk0NTMxIEEgMS4wMDAxMTYzIDEuMDAwMTE2MyAwIDEgMCA0Ny40NDcyNjYgMzIuMTA1NDY5IEwgNDUuNDQ3MjY2IDMxLjEwNTQ2OSBBIDEuMDAwMSAxLjAwMDEgMCAwIDAgNDQuOTY0ODQ0IDMwLjk5NDE0MSB6IE0gNi42MzA4NTk0IDM0IEwgMi45OTQxNDA2IDQyLjAwNTg1OSBMIDExLjk1NzAzMSA0MC4yMjY1NjIgTCAxMS43MjQ2MDkgNDcuMDA1ODU5IEwgMjAuMTA5Mzc1IDQwLjI5NDkyMiBMIDIzLjAwMTk1MyA0OC4wMzEyNSBMIDI4LjY2OTkyMiA0MS4zMTQ0NTMgTCAzMS45OTYwOTQgNDIuMzYxMzI4IEwgMzIuMDE3NTc4IDM0IEwgMzAuMDE3NTc4IDM0IEwgMzAuMDAzOTA2IDM5LjYzODY3MiBMIDI4IDM5LjAwNTg1OSBMIDIzLjY3NzczNCA0NC4xMjg5MDYgTCAyMS4wMTc1NzggMzcuMDA3ODEyIEwgMTMuODczMDQ3IDQyLjcyNDYwOSBMIDE0LjA0Mjk2OSAzNy43NzM0MzggTCA2LjQyNTc4MTIgMzkuMjgzMjAzIEwgOC44MjYxNzE5IDM0IEwgNi42MzA4NTk0IDM0IHogTSAzNi4wMTU2MjUgMzQuOTg4MjgxIEEgMS4wMDAxIDEuMDAwMSAwIDAgMCAzNS4zMjQyMTkgMzUuMjQ2MDk0IEEgMS4wMDAxIDEuMDAwMSAwIDAgMCAzNS4yOTY4NzUgMzUuMjY5NTMxIEEgMS4wMDAxIDEuMDAwMSAwIDAgMCAzNS4yNzUzOTEgMzUuMjkxMDE2IEEgMS4wMDAxIDEuMDAwMSAwIDAgMCAzNS4yMjQ2MDkgMzUuMzQ5NjA5IEEgMS4wMDAxIDEuMDAwMSAwIDAgMCAzNS4xNjQwNjIgMzUuNDI5Njg4IEEgMS4wMDAxIDEuMDAwMSAwIDAgMCAzNS4xMTEzMjggMzUuNTE1NjI1IEEgMS4wMDAxIDEuMDAwMSAwIDAgMCAzNS4xNTgyMDMgMzYuNTUyNzM0IEwgMzYuNTQyOTY5IDM5LjMyMjI2NiBDIDM1LjA2NTUwNiAzOS45MTI3NjMgMzQgNDEuMzIzNjQxIDM0IDQzIEMgMzQgNDUuMTk3MzM0IDM1LjgwMjY2NiA0NyAzOCA0NyBDIDM4Ljk3ODE4NCA0NyAzOS44MDI4MzcgNDYuNTYwODIyIDQwLjUgNDUuOTcyNjU2IEMgNDEuMTk3MTYzIDQ2LjU2MDgyMiA0Mi4wMjE4MTYgNDcgNDMgNDcgQyA0NS4xOTczMzQgNDcgNDcgNDUuMTk3MzM0IDQ3IDQzIEMgNDcgNDEuNDk0NDcgNDYuMDM4NzM2IDQwLjM1Mzg2MSA0NC43OTg4MjggMzkuNjczODI4IEMgNDQuODU2ODQzIDM5LjQ0MjQ3NSA0NSAzOS4yNDgyODIgNDUgMzkgQyA0NSAzNy4zNTUwMyA0My42NDQ5NyAzNiA0MiAzNiBDIDQxLjI0NzY2OCAzNiA0MC42MTc1NDkgMzYuMzQ3MTQ0IDQwLjA4Nzg5MSAzNi44MTA1NDcgTCAzNi41MjkyOTcgMzUuMTQyNTc4IEEgMS4wMDAxIDEuMDAwMSAwIDAgMCAzNi4wMTU2MjUgMzQuOTg4MjgxIHogTSA0MiAzOCBDIDQyLjU2NTAzIDM4IDQzIDM4LjQzNDk3IDQzIDM5IEMgNDMgMzkuMiA0Mi45NDI0OSAzOS4zNzc3ODYgNDIuODM3ODkxIDM5LjUzOTA2MiBMIDQyLjA2MjUgNDAuNzM2MzI4IEwgNDMuNDUxMTcyIDQxLjA1ODU5NCBDIDQ0LjMzODUzNCA0MS4yNjQwODggNDUgNDIuMDQyMjE0IDQ1IDQzIEMgNDUgNDQuMTE2NjY2IDQ0LjExNjY2NiA0NSA0MyA0NSBDIDQyLjI5NjMwOCA0NSA0MS42OTMwMTggNDQuNjQzMTIyIDQxLjMzMzk4NCA0NC4xMDE1NjIgTCA0MC41IDQyLjg0NTcwMyBMIDM5LjY2NjAxNiA0NC4xMDE1NjIgQyAzOS4zMDY5ODIgNDQuNjQzMTIyIDM4LjcwMzY5MiA0NSAzOCA0NSBDIDM2Ljg4MzMzNCA0NSAzNiA0NC4xMTY2NjYgMzYgNDMgQyAzNiA0Mi4xMjAyMzggMzYuNTYwMTM4IDQxLjM4Njk1IDM3LjMzMzk4NCA0MS4xMTMyODEgQyAzNy41NDE0OTggNDEuMDM5NjkgMzcuNzYyOTYgNDEgMzggNDEgTCAzOS42MTcxODggNDEgTCAzOC4xODE2NDEgMzguMTI2OTUzIEwgNDAuNjczODI4IDM5LjI5NDkyMiBMIDQxLjEzMjgxMiAzOC41IEMgNDEuMzA1ODkyIDM4LjIwMDg2MyA0MS42MjIxNjIgMzggNDIgMzggeiIvPjwvc3ZnPg=='

function randomRange(min, max) {
  return Math.random() * (max - min) + min
}

function randomSize() {
  return randomRange(50, 100)
}

function randomMass() {
  return randomRange(0.5, 10)
}

function update() {
  let particle = this

  switch (particle.state) {
  case 'bubbling':
    particle.image = bubble
    particle.x += randomRange(-particle.mass, particle.mass) * .3
    particle.y -= particle.mass
    if (particle.y < 0) particle.dismiss()
    break

  case 'exploding':
    particle.image = exploded
    particle.dismiss()
    break

  case 'dismissed':
    particle.y = canvas.height
    particle.x = randomRange(0, canvas.width)
    particle.size = randomSize() 
    particle.bubble()
    break

  default:
    throw new Error('unknown state')
  }

  return particle
}

function draw() {
  let particle = this
  ctx.fillStyle = particle.rgba
  ctx.beginPath()
  ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
  ctx.closePath()
  ctx.fill()
}

function drawImage() {
  let particle = this
  ctx.drawImage(particle.image, particle.x, particle.y, particle.size, particle.size)

  const path = new Path2D()
  const radius = particle.size / 2
  path.arc(particle.x + radius, particle.y + radius, radius, 0, 2 * Math.PI)
  particle.path = path
}


function makeParticle() {
  let particle = {
    x: randomRange(0, canvas.width),
    y: canvas.height,
    size: randomSize(),
    mass: randomMass(),
    rgba: `rgba(${randomRange(0, 255)}, ${randomRange(0, 255)}, ${randomRange(0, 255)}, ${randomRange(0.1, 1)})`,
    image: bubble,

    // states
    state: 'bubbling',
    bubble() { this.state = 'bubbling' },
    explode() { this.state = 'exploding' },
    dismiss() { setTimeout(() => this.state = 'dismissed', 500) },
  }

  particle.update = update 
  particle.draw = draw 
  particle.drawImage = drawImage 

  return particle
}

function makeParticles(count) {
  let particles = []
  for (let index = 0; index < count; index++) {
    particles.push(makeParticle())
  }
  return particles
}

function animate() {
  if (count === END_GAME) {
    alert('Well-done my friend.')
    return
  }

  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  particles.forEach((particle) => {
    particle
      .update()
      .drawImage()
  })

  requestAnimationFrame(animate)
}

function popping(e) {
  let particle = particles.find(particle => 
    ctx.isPointInPath(particle.path, e.clientX, e.clientY))

  if (particle) {
    particle.explode()
    count++
  } else {
    particles.push(...makeParticles(randomRange(1, 3)))
  }
}

const END_GAME = 100
let count = 0
let particles = makeParticles(1)

animate()
document.addEventListener('click', popping)
