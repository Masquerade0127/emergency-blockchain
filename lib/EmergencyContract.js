'use strict';

const { Contract } = require('fabric-contract-api');

class EmergencyContract extends Contract{
    
    constructor(){
        super('camcam.family.emergency');
    }

    async instantiate(ctx){
        console.log('Instantiate camcam.family.emergency contract');
    }

    /**
     * create data of emergency case
     * 
     * @param {Context} ctx 
     * @param {String} emergencyProfileId 
     * @param {String} emergencyProfileObject 
     */
    async createTest(ctx, ProfileId, ProfileObject){
        
        try {
            //check object and ProfileId
            if (!bloodProfileId){
                throw new Error('ProfileId is invalid');
            }
            if (!bloodProfileObject){
                throw new Error('emergency profile data invalid');
            }

            //store to ledger 
            await ctx.stub.putState(bloodProfileId, Buffer.from(JSON.stringify(bloodProfileObject)));
        } catch (error) {
            throw new Error('Error ' + error);
        }

    }

    /**
     * query profile data
     * 
     * @param {Context} ctx 
     * @param {String} emergencyProfileId 
     */
    async queryTest(ctx, emergencyProfileId){

        try {
            //get data of test
            let emergencyProfileAsByte = await ctx.stub.getState(emergencyProfileId);

            //check data
            if (!emergencyProfileAsByte || emergencyProfileAsByte.toString().length <= 0){
                throw new Error('data of profile ' + emergencyProfileId + ' does not exist');
            }

            //convert byte data to json
            let emergencyProfile = JSON.parse(emergencyProfileAsByte.toString());

            return emergencyProfile;
        } catch (error) {
            throw new Error('Error ' + error);
        }
        
    }

    /**
     * delete Test data
     * 
     * @param {Context} ctx 
     * @param {String} bloodProfileId 
     */
    async deleteExam(ctx, bloodProfileId){
        try {
            await ctx.stub.deleteState(bloodProfileId);
        } catch (error) {
            throw new Error("Error: " + error);
        }
    }
}

module.exports = EmergencyContract;