import { createElement } from 'lwc';
import WiredOpportunities from 'c/wiredOpportunities';
//import { registerApexTestWireAdapter } from '@salesforce/sfdx-lwc-jest';
import getStages from '@salesforce/apex/OpportunityController.getStages';
import getOpportunity from '@salesforce/apex/OpportunityController.getOpportunity';

// Realistic data with a list of stages
const mockGetStages = require('./data/stageList.json');

// Mocking the opportunities list
const mockGetOpportunities = require('./data/stagesOpportunities.json');

// Register as Apex wire adapter. Some tests verify that provisioned values trigger desired behavior.
//const getStagesListAdapter = registerApexTestWireAdapter(getStages);

describe('c-wired-opportunities', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    // Prevent data saved on mocks from leaking between tests
    jest.clearAllMocks();
    });

    describe("getStages @wire data",()=>{
        it('gets the lightning combobox', () => {
            const element = createElement('c-wired-opportunities', {
                is: WiredOpportunities
            });
            document.body.appendChild(element);
            return Promise.resolve().then(()=>{
                // Select elements for validation
                const oppElement = element.shadowRoot.querySelector('lightning-combobox');    
                expect(oppElement.name).toBe("stage combo box");
            });
        });
    });

    describe("test for stage names",()=>{
        it('Renders the stageName list in the dropdown element', () => {
            const element = createElement('c-wired-opportunities', {
                is: WiredOpportunities
            });
            document.body.appendChild(element);
            // getStagesListAdapter.emit(mockGetStages);
            getStages.emit(mockGetStages);
            
            return Promise.resolve().then(()=>{
                // Select elements for validation
                const oppElement = element.shadowRoot.querySelector('lightning-combobox');
                expect(oppElement.value).toBe("");
                // const stageListLength = mockGetStages.stageNames.length();
                expect(mockGetStages.data).toBe(getStages.data);
            });
        });
    });
    describe("test for opportunities for selected stage name",()=>{
        it('opportunity rendered in the data table is as expected', () => {
            const element = createElement('c-wired-opportunities', {
                is: WiredOpportunities
            });
            document.body.appendChild(element);
            getOpportunity.emit(mockGetOpportunities);
            
            return Promise.resolve().then(()=>{
                // Select elements for validation
                const oppElement = element.shadowRoot.querySelector('lightning-datatable');
                const obj = {'stgName':'Closed Lost'};
                var oppList = getOpportunity(obj);
                expect(oppElement.data[obj]).toBe(oppList);
            });
        });
    });
});