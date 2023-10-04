# HYRimageCrawler
![image](https://github.com/andythebreaker/HYRimageCrawler/assets/43373581/3c37e891-73ff-48a9-938e-5971f102ce63)

## install

### for windows user

0. need git or download this .zip

#### 1. ENVs

1. [install vs code (insider) (need ADMIN)](https://code.visualstudio.com/insiders/)
2. [install choco (need ADMIN)](https://docs.chocolatey.org/en-us/choco/setup#install-with-powershell.exe)
3. install node `choco install nodejs` **(need ADMIN)**
4. [install pnpm](/install_how_to/pnpm.txt)

#### 2. node_s

0. cd to './'
1. pnpm i

### version

- node:20

### you need port

- 45837

## using

### basic start

`pnpm start`

### before start

unit : ms

1. in `renderer.js` find `const result = await scraper("`... (about line 99)
2. replace above *STRING* to the target URL you want
3. in same file, find `//!important 等動畫`
4. look @ the next line (about line 51) **(這行在往後的文件我們會稱作ㄅ，方便解釋)**
5. set number (if UR CPU is slow, make it larger)
6. in same file, find `} else { console.log('hold...'); }`
7. look @ the next line (about line 86)
8. set number (if UR network speed is slow, make it larger, it must be larger then ㄅ+1000) **(這行在往後的文件我們會稱作ㄆ，方便解釋)**
9. in same file, find `// Wait until the user closes the browser`
10. look @ the next line (about line 89)
11. set number **總待機時間(will shutdown after this time)** (it must be larger then target DOC total pagenumber * ㄆ)

### after start

1. GUI press main BTON
2. wait browser show up
3. do login or WTF U want...
4. 注意分頁只能在1號，如果有網頁預設click on URL 的 action 是 open in 新分頁，suggest copy the URL of 分頁2...ect to 分頁1 。 **(分頁起始is 0)**
5. then set stat to 1 and press BTON
6. it will auto click (next page)
