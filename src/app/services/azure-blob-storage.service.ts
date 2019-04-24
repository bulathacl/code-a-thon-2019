import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, RequestMethod, ResponseContentType } from '@angular/http';
import { Observable ,  Subject} from "rxjs";
import {forkJoin} from "rxjs";
import { saveAs as importedSaveAs } from "file-saver";
import { SasTokenProperties } from '../models/file';


@Injectable()
export class AzureBlobStorageService {

    constructor(
        private http: Http
    ) { }

    public uploadMultipleFiles(fileDetails: { file: File, sasTokenProperties: SasTokenProperties }[], callbackOnUploadSucceeded = null, callbackOnUploadFailed = null, displayLoading = true) {
        const options = new RequestOptions({
            method: RequestMethod.Put
        });

        options.headers = new Headers({});
        options.headers.append('x-ms-blob-type', 'BlockBlob');

        const uploadObservables: any[] = [];
        fileDetails.forEach(fileDetail => {
            const uploadFileObservable = this.http.put(fileDetail.sasTokenProperties.blobUri + fileDetail.sasTokenProperties.sasToken, fileDetail.file, options);
            uploadObservables.push(uploadFileObservable);
        });

        //Loading indicator.
        const loading: Element = document.getElementById("azure-storage-loading");
        if (displayLoading) {
            this.setLoadingState(true);
        }

        forkJoin(uploadObservables).subscribe(
            (dataArr: Response[]) => {
                if (displayLoading) {
                    this.setLoadingState(false);
                }

                const notUploadedFile = dataArr.find(response => {
                    return response.status !== 201;     //not successfully uploaded
                });

                if (!notUploadedFile) {
                    if (callbackOnUploadSucceeded) {
                        callbackOnUploadSucceeded();
                    }
                } else {
                    if (callbackOnUploadFailed) {
                        callbackOnUploadFailed("Error in uploading file.");
                    }
                }
            },
            err => {
                if (displayLoading) {
                    this.setLoadingState(false);
                }

                if (callbackOnUploadFailed) {
                    callbackOnUploadFailed("Error in uploading file.");
                }
            }
        );
    }

    public uploadFile(sasTokenProperties: SasTokenProperties, file: File, callbackOnUploadSucceeded = null, callbackOnUploadFailed = null, displayLoading = true) {
        const options = new RequestOptions({
            method: RequestMethod.Put
        });

        options.headers = new Headers({});
        //this header is required by azure storage rest api, there are some other blob types such as appendblob, pageblob
        options.headers.append('x-ms-blob-type', 'BlockBlob');

        const uploadFileObservable = this.http.put(sasTokenProperties.blobUri + sasTokenProperties.sasToken, file, options);

        //Loading indicator.
        const loading: Element = document.getElementById("azure-storage-loading");
        if (displayLoading) {
            this.setLoadingState(true);
        }

        const subject: Subject<any> = new Subject<any>();

        uploadFileObservable.subscribe(
            azureApiResult => {
                if (displayLoading) {
                    this.setLoadingState(false);
                }

                if (azureApiResult.status == 201) {   //if file is successfully uploaded api returns 201
                    if (callbackOnUploadSucceeded) {
                        callbackOnUploadSucceeded();
                    }
                } else {
                    if (callbackOnUploadFailed) {
                        callbackOnUploadFailed("Error in uploading file.");
                    }
                }

                subject.next(azureApiResult);
            },
            err => {
                if (displayLoading) {
                    this.setLoadingState(false);
                }

                if (callbackOnUploadFailed) {
                    callbackOnUploadFailed("Error in uploading file.");
                }
                subject.error(err);
            }
        );

        return subject;
    }

    public downloadFile(sasTokenProperties: SasTokenProperties, fileName: string, callbackOnSucceeded = null, callbackOnFailed = null, displayLoading = true) {
        const options = new RequestOptions({ responseType: ResponseContentType.Blob });

        const downloadFileObservable = this.http.get(sasTokenProperties.blobUri + sasTokenProperties.sasToken, options);

        //Loading indicator.
        const loading: Element = document.getElementById("azure-storage-loading");
        if (displayLoading) {
            this.setLoadingState(true);
        }

        downloadFileObservable.subscribe(
            result => {
                if (displayLoading) {
                    this.setLoadingState(false);
                }

                importedSaveAs(result.blob(), fileName);
                if (callbackOnSucceeded) {
                    callbackOnSucceeded();
                }
            },
            err => {
                if (displayLoading) {
                    this.setLoadingState(false);
                }

                if (callbackOnFailed) {
                    callbackOnFailed("Unable to donwload the file.");
                }
            }
        );

        return downloadFileObservable;
    }

    private setLoadingState(busy: boolean) {
        //this.busyIndicatorService.setBusy(busy);
    }
}