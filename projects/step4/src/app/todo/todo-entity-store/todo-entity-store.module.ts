import { NgModule } from "@angular/core";
import { EntityMetadataMap, NgrxDataModule } from "ngrx-data";

export const entityMetadata: EntityMetadataMap = {
	Task: {}
};

@NgModule({
	imports: [
		NgrxDataModule.forRoot({
			entityMetadata: entityMetadata
		})
	]
})
export class TodoEntityStoreModule {}
