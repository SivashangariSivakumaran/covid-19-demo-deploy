class APIfunctions{
    constructor(query,queryStr){
        this.query=query;                    //mongoose query
        this.queryStr=queryStr               //query comming from route (express)
    }

    filter(){
        const queryObj = {...this.queryStr}
        const excludeFields = ['page','sort','limit','fields']  //FLITERRING
        excludeFields.forEach(el=>delete queryObj[el])

        let queryStr=JSON.stringify(queryObj)                //localhost:8000/api/v1/patients?name=Nimsl&age[gte]=7
        queryStr=queryStr.replace(/\b(gte|lte|gt|le)\b/g,match=>`$${match}`)

        this.query.find(JSON.parse(queryStr))
        // let query=Patient.find(JSON.parse(queryStr))
        return this
    }

    sort(){
        if(this.queryStr.sort){
            const sortBy=this.queryStr.sort.split(',').join(' ')         //localhost:8000/api/v1/patients?age[gte]=7&sort=age,no
            this.query = this.query.sort(sortBy)      
        }else{
            this.query = this.query.sort('-createdAt')
        }
        return this
    }

    select(){
        if(this.queryStr.fields){
            const fields =this.queryStr.fields.split(',').join(' ')
            this.query.select(fields)
        }else{
            this.query.select('-__v')
        }
        return this
    }

    pagination (){
        const page =this.queryStr.page*1 || 1
        const limit=this.queryStr.limit*1 || 100
        const skip=(page-1)*limit
        query=query.skip(skip).limit(limit)                    //localhost:8000/api/v1/patients?page=2&limit=10

        // if(this.queryStr.page){
        //     const numPatient=await Patient.countDocuments()
        //     if(skip>=numPatient) throw new Error('The page is not exist')
        // }
        return this
    }
}
module.exports=APIfunctions