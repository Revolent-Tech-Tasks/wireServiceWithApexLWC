import { LightningElement, track, wire } from 'lwc';
import getStages from '@salesforce/apex/OpportunityController.getStages';
import getOpportunity from '@salesforce/apex/OpportunityController.getOpportunity';
export default class WiredOpportunities extends LightningElement {
    @track currentOpportunity = '';
    @wire(getStages) stageNames;
    @wire(getOpportunity, { stgName: '$currentOpportunity' }) OpportunityDetails;
    columns = [    
        { label: 'Opportunity', fieldName: 'Name' },
        { label: 'Stage', fieldName: 'StageName' }
        ]   
    handleChange = (eve) => {
        this.currentOpportunity = eve.target.value;
    }
}
