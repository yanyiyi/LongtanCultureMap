# GoogleMapApi
- 相關使用說明 https://hackmd.io/NERLfQ59Qn6UahiGfNEutg
---
**目前問題**
- ~~螢幕解析度寬為1920的使用者，google將判別為1536無法正確判別1920的大小<br>~~

- ~~要在ContentText(在sheet中為infocontent#...)插入圖片，要把圖片來源用"ImgStart:你的圖片來源:ImgEnd"的格式包覆起來才可以正常加入~~
- 圖片用語法加入

文學地圖編輯說明
===

## 表單填寫分類說明

- **lat**:  緯度
- **long**: 經度
- **tit**:  鼠標一至座標點上浮現出的提示字
- **ico**:  座標點的圖示
- **textdata**: infowindow中的文字內容
- **type**: 此座標點的分類，輸入數字來賦予此座標分類
- **infoimage**:  infowindow中的圖片
- **infotitle**:  infowindow中的標題
- **infocontent#**: infowindow中的文字內容
- **contenttitle#**:  詳細內容中可選取的文章標題

## 表單填寫語法使用說明

- **ImgStart:** 圖片來源 **:ImgEnd** 藉此在詳細內容中插入圖片，意即在表單中的 infocontent# 中要插入圖片，需以此語法來新增圖片至內文中。



程式碼標籤
===
- **>Update:** 利用Ctrl+F搜尋>Update來找尋增加文章篇幅時所需要更改的地方。

停止在此更新，詳細新增請至https://hackmd.io/NERLfQ59Qn6UahiGfNEutg 查詢
