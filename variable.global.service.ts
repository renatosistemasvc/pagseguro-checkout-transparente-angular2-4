import {Injectable}     from '@angular/core'

@Injectable()
export class VariableGlobal {

    public status:boolean = false;

    constructor(){ }

     setStatusScript(status:boolean){
               
        this.status = status;
    }

    getStatusScript(){
        
        return this.status;
    }




}
