import {mapActions} from 'vuex'
export default {
    data(){
        return {
            page_id:Number(this.$route.query.page_id) || 1,
            page_count:Number(this.$route.query.page_count) || 10,
            page_total: 0
        }
    },
    methods: {
        ...mapActions(['admin_show_user_dialog']),
        handleSizeChange(val){
            this.page_count = val;
            this.jump();
        },
        handleCurrentChange(val){
            this.page_id = val;
            this.jump();
        },
        jump(){
             this.$router.push({path:this.$route.path,query:{
                    page_id:this.page_id,
                    page_count:this.page_count
                }
            });
        },
        parseImg(data) {
            if(!data) return []
            try {
                return Array.isArray(data) ? data : JSON.parse(data)
            } catch {
                return []
            }
        },
        tableRowClassName({
            row,
            rowIndex
        }) {
            if (row.deleted != 0) {
                return 'deleted-row';
            }
            return '';
        },
    },   
}