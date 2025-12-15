import { Component, HostListener, ElementRef, ViewChild } from '@angular/core';

//////////////////////
interface Box {
  id: number,
  title: string;
  top: number;
  left: number;
  width: number;
  height: number;
}
/////////////////////


@Component({
  selector: 'form-design',
  templateUrl: './form-design.component.html',
  styleUrls: ['./form-design.component.css'],
})
export class FormDesignComponent {

  ///////////////////////////////////////////////////
  items: Box[] = [
    { id: 1, title: 'نام', top: 20, left: 10, width: 1000, height: 70 },
    { id: 2, title: 'واحد سازمانی', top: 122, left: 40, width: 1000, height: 70 },
    { id: 3, title: 'مشاغل', top: 222, left: 70, width: 1000, height: 70 },
  ];
  ///////////////////////////////////////////////////////
  showBoxes: Box[] = [];
  BoxesHistory: Box[][] = [];
  isEditingBox = false;
  startX = 0;
  startY = 0;
  containerHeight = 500; 
  resizingContainer = false; 
  resizingBox: Box | null = null;
  draggingBox: Box | null = null;



  @ViewChild('boxContainer', { static: true }) boxContainer!: ElementRef;

  ngOnInit() {
    this.drawBoxesForValidItems();
    this.BoxesHistory = JSON.parse(JSON.stringify(this.showBoxes));
  }


  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {

    if (this.resizingContainer) {
      const deltaY = event.movementY;
      this.containerHeight = Math.max(400, this.containerHeight + deltaY); 
    }

    if (this.resizingBox) {
      const dx = event.clientX - this.startX;
      const dy = event.clientY - this.startY;

      this.resizingBox.width = Math.max(50, this.resizingBox.width + dx);
      this.resizingBox.height = Math.max(50, this.resizingBox.height + dy);

      const boxBottom = this.resizingBox.top + this.resizingBox.height;
      if (boxBottom > this.containerHeight) {
        this.resizingBox.height = this.containerHeight - this.resizingBox.top;
      }

      this.startX = event.clientX;
      this.startY = event.clientY;
      const updatedBoxes = this.showBoxes.map(e => {
        if (e.id === this.resizingBox?.id) {
          return { ...e, width: this.resizingBox.width, height: this.resizingBox.height };
        }
        return e;
      });
      this.showBoxes = updatedBoxes;
      this.isEditingBox = true;
    }



    if (this.draggingBox) {
      const containerRect = this.boxContainer.nativeElement.getBoundingClientRect();
      const newLeft = event.clientX - this.startX - containerRect.left;
      const newTop = event.clientY - this.startY - containerRect.top;

      this.draggingBox.left = Math.max(0, Math.min(containerRect.width - this.draggingBox.width, newLeft));
      this.draggingBox.top = Math.max(0, Math.min(containerRect.height - this.draggingBox.height, newTop));

      const updatedBoxes = this.showBoxes.map(e => {
        if (e.id === this.draggingBox?.id) {
          return { ...e, left: this.draggingBox.left, top: this.draggingBox.top };
        }
        return e;
      });
      this.showBoxes = updatedBoxes;
      this.isEditingBox = true;
    }

  }

  @HostListener('window:mouseup')
  onMouseUp() {
    this.resizingContainer = false;
    this.resizingBox = null;
    this.draggingBox = null;
  }

  startResizing(event: MouseEvent, box: Box) {
    event.stopPropagation();
    this.resizingBox = box;
    this.startX = event.clientX;
    this.startY = event.clientY;
  }

  startResizingContainer(event: MouseEvent) {
    event.stopPropagation();
    this.resizingContainer = true;
  }

  SetcontainerHeight(event: MouseEvent) {
    this.containerHeight = event.clientY
  }

  stopPropagation(event: MouseEvent) {
    event.stopPropagation();
  }


  drawBoxesForValidItems() {

    //this.containerHeight = getfromback

    
    this.showBoxes.splice(0, this.showBoxes.length);
    this.BoxesHistory.splice(0, this.BoxesHistory.length);
    this.items.forEach((item) => {
        this.showBoxes.push({
          id: item.id,
          title: item.title,
          top: item.top,
          left: item.left,
          width: item.width,
          height: item.height,
        });
    });
  }

/////////////////////////////////////////////
  async save() {
    this.isEditingBox = false;
    try {

      console.log("Data saved!");

    } catch (error) {
      console.error("Save error:", error);
     
    }
  }
/////////////////////////////////////////////





  cancel() {
    this.isEditingBox = false;
    this.showBoxes = JSON.parse(JSON.stringify(this.BoxesHistory));
  }

  startDragging(event: MouseEvent, box: Box) {
    event.stopPropagation();
    this.draggingBox = box;
    this.startX = event.clientX - box.left;
    this.startY = event.clientY - box.top;
  }
}
