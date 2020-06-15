import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable, of } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirestorageService {

  path = '';
  task: AngularFireUploadTask = null;
  uploadProgress = new Observable();
  downloadURL = of('');


  constructor(
    public firestorage: AngularFireStorage,
    public auth: AuthService) { }

  upload(event) {
    console.log('event: ', event);
    
    let ext = '.jpg';
    if (event.target.files[0].type === 'image/png') {
      ext = '.png';
    }

    this.firestorage.upload('images/' + this.auth.authUser.uid + ext , event.target.files[0])
    .then(result => {
      console.log('result', result);
    }).catch(error =>{
      console.log('error', error);
    });

  }

}