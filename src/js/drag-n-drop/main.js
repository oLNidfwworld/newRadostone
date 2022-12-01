// /** @var Драг-н-дроп */
//     let drag_n_drop = document.querySelector('.drag-n-drop');

// ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
//     drag_n_drop.addEventListener(eventName,preventDefaults,false);
// })

// ;['dragover','dragenter'].forEach(eventName => {
//     drag_n_drop.addEventListener(eventName,highlight,false);
// })

// ;['dragleave','drop'].forEach(eventName => {
//     drag_n_drop.addEventListener(eventName,unhighlight,false);
// })

// drag_n_drop.addEventListener('drop',dropHandler,false);

// function highlight(e){
//     drag_n_drop.classList.add('highlight');
// }
// function unhighlight(e){
//     drag_n_drop.classList.remove('highlight'); 
// }

    class DragNDrop{

        constructor(dnd_element){
            this.dragNDrop_element = undefined;
            if(dnd_element == undefined){
                return undefined;
            }else if(typeof(dnd_element) === 'string'){
                this.dragNDrop_element = document.querySelector(dnd_element);
            }else{
                this.dragNDrop_element = dnd_element;
            }
            this._element = this.dragNDrop_element;
            this.setEventListeners();
        } 
        setEventListeners(){
            ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
                this.dragNDrop_element.addEventListener(eventName,this.preventDefaults,false);
            })
            ;['dragover','dragenter'].forEach(eventName => {
                this.dragNDrop_element.addEventListener(eventName,this.highlight,false);
            })
            
            ;['dragleave','drop'].forEach(eventName => {
                this.dragNDrop_element.addEventListener(eventName,this.unhighlight,false);
            })
            this.dragNDrop_element.addEventListener('drop',this.dropHandler,false);
        } 
        dropHandler(e){
            let data = e.dataTransfer;
            let files = data.files;
        
            this.filesHandler(files);
        }
        filesHandler(files){
            ([...files]).forEach(file => this.uploadFile(file));
        }
        uploadFiles(file){
            let url = 'localhost:8000/img/';
            let formData = new FormData();
        
            formData.append('file',file);
        
            fetch(url, {
                method: 'POST',
                body: formData
            }).then(()=>{}).catch(()=>{})
            
        }
        preventDefaults (e) {
          e.preventDefault()
          e.stopPropagation()
        }
        
    
        highlight(e){
            this.dragNDrop_element.classList.add('highlight');
        }
        unhighlight(e){
            this.dragNDrop_element.classList.remove('highlight'); 
        }

        get element(){
            return this._element;
        }
        
    } 

module.exports = DragNDrop;