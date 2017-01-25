import { Component, OnInit, Input } from '@angular/core';
import { ProjectService } from '../../project.service';
import { Uploader }      from 'angular2-http-file-upload';
import { MyUploadItem }  from './my-upload';

@Component({
  selector: 'my-dropzone',
  templateUrl: './my-dropzone.component.html',
  styleUrls: ['./my-dropzone.component.less']
})
export class MyDropzoneComponent implements OnInit {

  @Input() files: any[];
  @Input() existing: any[];
  @Input() type: string;
  @Input() count: number;

  public file:any;
  public serverPath:string = '';
  public image:any;
  public process:boolean = false;
  constructor(private _projectService: ProjectService, public uploaderService: Uploader) { }

  ngOnInit() {
    this.serverPath = this._projectService.getPath();
  }

  saveImage(path){

    let myUploadItem = new MyUploadItem(this.file, this._projectService.getPath() + path);
    // myUploadItem.formData = { FormDataKey: 'Form Data Value' };  // (optional) form data can be sent with file

    this.uploaderService.onSuccessUpload = (item, response, status, headers) => {
      this.files.push(response);
    };
    this.uploaderService.onErrorUpload = (item, response, status, headers) => {
      this.existing[this.existing.length -1].error = response;
    };
    this.uploaderService.onCompleteUpload = (item, response, status, headers) => {
      this.existing[this.existing.length -1].progress = false;
    };
    this.uploaderService.upload(myUploadItem);
  }

  showUploadedImage(event){
    if(this.process || this.existing.length > this.count - 1)return;
    this.process = true;

    let input = event.target;

    if (input.files && input.files[0]) {

      for(let file of input.files){
        this.file = file;

        if(this.type == 'story'){
          this.saveImage('/app_dev.php/success-story/add-images');
        }
      }


      let reader = new FileReader();

      reader.onload = (e:any) => {
        if(e && e.target){
          this.image = e.target.result;
          this.existing.push({
            file_name: this.file.name,
            image: this.image,
            progress: true,
            error:''
          })
        }
      };

      reader.readAsDataURL(input.files[0]);
    }


    this.process = false;
  }

  cancel(i){
    if(this.existing && this.existing[i].id){
      let index = this.files.indexOf(this.existing[i].id);
      if(index !== -1){
        this.files.splice(index, 1);
      }
    }

    this.existing.splice(i,1);

  }
}
