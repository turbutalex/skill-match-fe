import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NgIf } from "@angular/common";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  imports: [
    NgIf
  ],
  styleUrls: ['./upload.component.css']
})
export class UploadComponent {
  selectedFile: File | null = null;
  uploadSuccess = false;
  errorMessage = '';
  parsedResume: any = null

  constructor(private http: HttpClient) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      this.selectedFile = input.files[0];
    }
  }

  onUpload(): void {
    if (!this.selectedFile) {
      this.errorMessage = 'Please select a file to upload';
      return;
    }

    const formData = new FormData();
    formData.append('resume', this.selectedFile);

    this.http.post('http://localhost:8080/api/resume', formData).subscribe({
      next: (response) => {
        console.log('Upload success:', response);
        this.uploadSuccess = true;
        this.errorMessage = '';
        this.parsedResume = response
      },
      error: (err: HttpErrorResponse) => {
        console.error('Upload failed:', err);
        this.uploadSuccess = false;
        this.errorMessage = 'Upload failed. Please try again.';
      }
    });
  }
}
