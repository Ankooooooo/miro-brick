(function(window){

    var dsMultiUpload = function(_id){
  
      if(!document.getElementById(_id)) return;
  
      const id = _id;
      var curFileList = [];
  
      // init multiUpload
      initMultiUpload();
      removeFiles();
      // if(_options && _options.fileList.length > 0)
      //   addFiles(_options.fileList);
      // else
      drawEmptyContent();
      
  
      // ------------------- 라이브러리 내에서 사용할 함수들 (private function)  --------------------    
      // file upload init fn
      function initMultiUpload()
      {
        const mainEl = document.getElementById(id);
        if(mainEl.childNodes.length > 0) mainEl.innerHTML = '';
  
        mainEl.innerHTML = drawMultiUploader();
  
        // event init
        multiUploadEventInit();
      }
  
      // event binding
      function multiUploadEventInit(){
        let fileInput = document.querySelector(`#${id} .file__input`);
        const findBtn = document.querySelector(`#${id} .file__search`);
        const removeFilesBtn = document.querySelectorAll('.file__delete');
  
        // searchBtn event
        findBtn.addEventListener('click' , e => {
          fileInput.click();
        });
  
        // file search input event 
        fileInput.addEventListener('change', () => {  
          const files = fileInput.files;
          addFiles(files);
          removeFiles();
        })
      }
  
      // file 추가
      function addFiles(files){
  
        if(files.length < 1){
          drawEmptyContent();
          return;
        }
  
        // draw file list html
        const fileList = files;
        const ulContent = document.querySelector(`#${id} .file__list`);
  
        if(fileList.length > 0){
          // 비어 있는 li 삭제
          if(checkEmptyFile()) ulContent.textContent = "";  
      
          for(let i = 0; i < fileList.length; i++){
            const file = fileList[i];
            if(!fileCheckDuplicates(file.name)){
              ulContent.innerHTML += drawFileListContent(file);
              curFileList.push(file);
            }else{
              alert(`${file.name}이 중복되었습니다!`);
              return;
            }
          }
          syncInputFileList(curFileList);
        }
      }

      function removeFiles(){
        const btn = document.querySelectorAll('.file__delete');
  
        btn.forEach((el) => {
          el.addEventListener('click', e => {
            const isEmpty = checkEmptyFile();
            if(isEmpty) return;
            
            const li = e.target.closest('li');
            const fileName = li.childNodes[1].textContent;
    
            if(curFileList.length > 0){
              curFileList.forEach((item, index) => {
                if(item.name === fileName){
                  curFileList.splice(index, 1);
                }
              })
            }
  
            li.remove();
    
            const resultCheckList = document.querySelectorAll(`#${id} .file__list li`);
            if(resultCheckList.length === 0){
              const ulContent = document.querySelector(`#${id} .file__list`);
    
              ulContent.innerHTML = `
                <li class="is-empty">첨부한 파일이 없습니다.</li>
              `;
            }
    
            // allCheckBtn unCheck
            syncInputFileList(curFileList);
          });     
        })
      }

      // draw empty content
      function drawEmptyContent(){
        const ulContent = document.querySelector(`#${id} .file__list`);
        ulContent.innerHTML = `
          <li class="is-empty">첨부판 파일이 없습니다.</li>
        `;
        return;
      }
  
      // input files에 curFileList sync 맞춰줌
      function syncInputFileList(files){
          var fileInput = document.querySelector(`#${id} .file__input`);
          
          const dataTranster = new DataTransfer();
          files.forEach(file => {
              dataTranster.items.add(file);
          });
          fileInput.files = dataTranster.files;
      }
  
      // file list가 비어있는지 체크
      function checkEmptyFile(){
        // empty file check
        const firstLi = document.querySelectorAll(`#${id} .file__list li`)[0];
        if(!firstLi) return;
        return firstLi.classList.contains('is-empty');
      }
  
      // 파일이름 중복체크
      function fileCheckDuplicates(fileName) {
        const result = curFileList.find(file => file.name === fileName);
        return result ? true : false;
      }
  
  
      // draw file list li content
      function drawFileListContent(file){
        const fileName = file.name;
        const li = `
          <li>
            <span>${fileName}</span>
            <button type="button" class="file__delete"></button>
          </li>
        `
        return li;
      }
  
      // draw multiupload html
      function drawMultiUploader(){
        const mainContentEl = `
        <button type="button" class="btn is-secondary file__search">파일 선택</button>
        <input type="file" style="display:none" class="file__input" multiple/>
        <ul class="file__list">
        </ul>
        `;
  
        return mainContentEl;
      };
  
      // ------------------- 외부로 노출시킬 함수들 --------------------    
      function getFileList(){
        const fileInput = document.querySelector(`#${id} .file__input`);
        return fileInput.files;
      }
  
      function setFileList(_files){
        
        if(typeof _files !== 'object' || _files.length === undefined){
          return;
        }
  
        const ulContent = document.querySelector(`#${id} .file__list`);
        if(ulContent.children.length > 0){
           ulContent.innerHTML = "";
        }
  
        curFileList = [];
        var newFileList = [];
        for (let i = 0; i < _files.length; i++) {
          newFileList.push(_files[i]);
        }
  
        addFiles(newFileList);
        removeFiles();
      }
  
      return {
        id,
        getFileList,
        setFileList,
      }
    }
  
    window.dsMultiUpload = dsMultiUpload;
  
  })(window);