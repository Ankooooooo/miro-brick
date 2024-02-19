# Miro Brick

### Environment
> 형태: 반응형 웹

### Branch Rule
> main
>
> feature/main : 메인  
> feature/product : 제품  
> feature/gallery : 시공 갤러리  
> feature/board : 고객센터  


### Viewport Size Guide
> Mobile: Width <= 834px  
> Tablet: 834px < Width < 1312px  
> PC: 1312px <= Width
>
> <Media Query 사용>
> <p>
> // MO <br />
> @media screen and (max-width: #{$breakpoint-tablet - 1px})
> </p>
> <p>
> // Tablet <br />
> @media screen and (min-width: #{$breakpoint-tablet}) and (max-width: #{$breakpoint-pc - 1px})  
> </p>
> <p>
> // PC <br />
> @media screen and (min-width: #{$breakpoint-pc})
> </p>

### Install Extension
> Live Sass Compiler

### Font
> Base: Noto Sans KR  
> Used: Roboto, Apple SD Gothic Neo

### Layout Structure

<details>
    <summary>
        <strong>Main</strong>
    </summary>

> Header  
> Category  
> Navigation_product  
>  
> Main contents
>  
> Footer
</details>

<details>
    <summary>
        <strong>Product (제품)</strong>
    </summary>

> Header  
> Category  
> Navigation_product  
>  
> Product contents
>  
> Footer
</details>

<details>
    <summary>
        <strong>Gallery (시공갤러리)</strong>
    </summary>
 
> Header  
> Category  
> Navigation_gallery  
>  
> Gallery contents
>  
> Footer
</details>

<details>
    <summary>
        <strong>Qna (고객센터)</strong>
    </summary>

> Header  
> Category  
> Navigation_qna  
>  
> GalleQnary contents
>  
> Footer
</details>


### Base.js

###### - includePath(callback: void)
```
data-include-path

parameter - callback (void)
  > html 로드 된 후에 실행될 코드 선언
```

###### - findViewPort
```
넓이값 감지하여 현재 기기 확인
window.viewport를 통해 확인 가능
(mobile, tablet, pc)
```

###### - showViewport
```
v-if와 비슷
data-viewport="[보여주고 싶은 기기 입력]"

ex)
Mobile에서만 show : data-viewport="mobile"
Tablet에서만 show : data-viewport="tablet"
PC에서만 show : data-viewport="pc"

Mobile, Tablet에서만 show : data-viewport="mobile, pc"
```

###### - setHeaderTitle
```
 현재 열려있는 1Depth 메뉴의 이름 지정
 window.title 값 설정

 ex) 
 window.title = '제품'
```

###### - setSelectedNaviation
```
 현재 열려있는 2Depth 메뉴의 이름 지정
 window.subTitle 값 설정

 ex) 
 window.subTitle = '공지'
```

###### - setSelectedNaviation(value: boolean)
```
 Side Menu (Category) 열고 닫기

 parameter - value (boolean)
    > true: 열기
    > false: 닫기  

 사용 페이지 : header, subHeader, category
```

###### - handleOpenFootercontent
```
 Footer Detail Content 열고 닫기

 사용 페이지 : footer
```

###### - goback
```
 뒤로가기

 사용 페이지 : subHeader
```

###### - openUrl
```
 새창 열기

 type : instagram, naver
  > Type 추가 될 경우 openUrl 함수 내부에 type 추가

 사용 페이지 : header, subHeader, category, footer
```
