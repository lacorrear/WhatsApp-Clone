import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";

@NgModule({
  declarations: [],
  imports: [CommonModule, MatButtonModule, MatIconModule, MatMenuModule],
  exports: [MatButtonModule, MatIconModule, MatMenuModule],
})
export class MaterialModule {}
