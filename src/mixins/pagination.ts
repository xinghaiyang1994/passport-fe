import { Vue, Component } from 'vue-property-decorator'

@Component
export default class Pagination extends Vue{
  // data
  mixinPage = {
    pageSizes: [10, 20],
    pageSize: 10,
    currentPage: 1,
    total: 20,
    layout: 'total, sizes, prev, pager, next, jumper'
  }
  
  // methods
  getList() {}
  mixinSizeChange (value: number) {
    this.mixinPage.pageSize = value
    this.mixinPage.currentPage = 1
    this.getList()
  }
  mixinCurrentChange (value: number) {
    this.mixinPage.currentPage = value
    this.getList()
  }
}