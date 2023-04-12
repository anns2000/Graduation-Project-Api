class ApiFeatures {
    constructor(myQuery, queryStr) {
        this.myQuery = myQuery;
        this.queryStr = queryStr;
    }
    filter() {
        const queryObject = { ...this.queryStr };
        const excludeQuery = ['page', 'sort', 'limit', 'feild', 'keyword'];
        excludeQuery.forEach((item) => delete queryObject[item])

        let queryStr = JSON.stringify(queryObject);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => '$' + match)

        this.myQuery = this.myQuery.find(JSON.parse(queryStr))
        return this;
    }
    sort() {
        if (this.queryStr.sort) {
            const sort = this.queryStr.sort.split(",").join(' ')
            this.myQuery = this.myQuery.sort(sort);
        }
        return this;

    }
    fielding() {
        if (this.queryStr.feild) {
            const feilds = this.queryStr.feild.split(",").join(' ');
            this.myQuery = this.myQuery.select(feilds);
        }
        return this;

    }
    keyword() {
        if (this.queryStr.keyword) {
            const query = {}
            query.$or = [
                { titel: { $regex: this.queryStr.keyword, $options: 'i' }, },
                { description: { $regex: this.queryStr.keyword, $options: 'i' }, }
            ]
            this.myQuery = this.myQuery.find(query);

        }
        return this;

    }
    paging() {
        const page = this.queryStr.page * 1 || 1;
        const limit = this.queryStr.limit * 1 || 5;
        const skip = (page - 1) * limit;
        this.myQuery = this.myQuery.skip(skip).limit(limit);
        
        return this;

    }
}
module.exports=ApiFeatures