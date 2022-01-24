import { createElement } from 'lwc';
import WiredOpportunities from 'c/wiredOpportunities';
import { registerApexTestWireAdapter } from '@salesforce/sfdx-lwc-jest';
import getStages from '@salesforce/apex/OpportunityController.getStages';
// Realistic data with a list of contacts
const mockGetStages = require('./data/stageList.json');

// Register as Apex wire adapter. Some tests verify that provisioned values trigger desired behavior.
const getStagesListAdapter = registerApexTestWireAdapter(getStages);

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
        it('Renders the stageName list in the dropdown element', () => {
            const element = createElement('c-wired-opportunities', {
                is: WiredOpportunities
            });
            document.body.appendChild(element);
            getStagesListAdapter.emit(mockGetStages);
            
            return Promise.resolve().then(()=>{
                // Select elements for validation
                const oppElement = element.shadowRoot.querySelector('lightning-combobox');    
                expect(oppElement.name).toBe("stage combo box");
            });
        });
    });
});