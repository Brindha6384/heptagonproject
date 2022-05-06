import { CdkDragDrop} from '@angular/cdk/drag-drop';
import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ITask } from '../module/task';


@Component({
  selector: 'app-one',
  templateUrl: './one.component.html',
  styleUrls: ['./one.component.css']
})
export class OneComponent implements OnInit {
  todoForm !:FormGroup;
  tasks : ITask [] = [];
  inprogress : ITask [] = [];
  done : ITask [] = [];
  cancelledtask : ITask [] = [];
  holdtask : ITask [] = [];
  updatedIndex!:any;
  isEditEnabled : boolean=false;
  todoForm1: any;
 
  
  

  constructor(private fb : FormBuilder) {}

  ngOnInit(): void {
    this.todoForm=this.fb.group({
      item : ['', Validators.required]
    })
  }
  addTask(){
    this.tasks.push({
      description:this.todoForm.value.item,
      done:false
    });
    this.todoForm.reset();
  }
  onEdit(item:ITask,i: number){
    this.todoForm.controls['item'].setValue(item.description);
    this.updatedIndex = i;
    this.isEditEnabled = true;
  }

  updateTask(){
    this.tasks[this.updatedIndex].description = this.todoForm.value.item;
    this.tasks[this.updatedIndex].done = false;
    this.todoForm.reset();
    this.updatedIndex = undefined;
    this.isEditEnabled = false;


  }
  updateInProgressTask(){
    this.inprogress[this.updatedIndex].description = this.todoForm.value.item;
    this.inprogress[this.updatedIndex].done = false;
    this.todoForm.reset(); 
   this.updatedIndex = undefined;
  
    this.isEditEnabled = false;
   

  
    
    
    

  }
  
  deleteTask(i: number){
    this.tasks.splice(i,1)

  }
  deleteInProgressTask(i: number){
    this.inprogress.splice(i,1)
}
deleteDoneTask(i: number){
  this.done.splice(i,1)
}
deleteCancelledTask(i: number){
  this.cancelledtask .splice(i,1)
}
deleteHoldTask(i: number){
  this.holdtask.splice(i,1)
}
  drop(event: CdkDragDrop<ITask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

}
