public class OpportunityController {
    public with sharing class ValueWrapper {
        @auraEnabled public string label {get;set;}
        @auraEnabled public string value {get;set;}
    } 
    //get list of stages
    @AuraEnabled(cacheable = true)
    public static List<ValueWrapper> getStages() {
        List<Schema.PicklistEntry> fieldResults = Opportunity.stageName.getDescribe().getPicklistValues();
        List<ValueWrapper> stageList = new List<ValueWrapper>();
        for(Schema.PicklistEntry fieldResult: fieldResults){
            ValueWrapper returningObject = new ValueWrapper();
            returningObject.value = fieldResult.value;
            returningObject.label = fieldResult.label;
            stageList.add(returningObject);
        }
        ValueWrapper returningObject = new ValueWrapper();
        returningObject.value = 'All';
        returningObject.label = 'All';
        stageList.add(returningObject);
        return stageList;
    }
    @AuraEnabled(cacheable = true)
    public static List<Opportunity> getOpportunity(string stgName){
        String key = stgName == 'All' ? '%' : stgName;
        return [SELECT id, name, accountId, stageName
                FROM opportunity
                WHERE stageName
                Like :key
               ];
    }
}