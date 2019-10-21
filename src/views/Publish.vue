<template>
  <div class="container">
    <h1 class="june">发布新闻</h1>
    <div style="width:120%;margin-bottom:18px;">
    <el-steps :active="active" align-center :process-status="ps" finish-status="success" >
      <el-step title="填写信息" description="必要"></el-step>
      <el-step title="编辑内容" description="可选"></el-step>
      <el-step title="提交完成" description="上传"></el-step>
    </el-steps>
    </div>

    <el-form ref="form" class="form" :model="form" :rules="rules" label-width="80px">
      <div class="n1" v-show="active == 0">
        <el-form-item label="新闻标题" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="新闻描述" prop="desc">
          <el-input v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item label="作者分类" prop="writer">
          <el-input prefix-icon="el-icon-user" v-model="form.writer" style="width:220px" placeholder="" clearable></el-input>
          <el-divider direction='vertical'></el-divider>
           <el-select default-first-option filterable remote placeholder="请输入关键词" :remote-method="remoteMethod"
            v-model="category" style="width:220px">
            <el-option v-for="item in categoryList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
            <div style="padding-left: 4px;" slot="prefix"> <i class="el-icon-files"></i> </div>
          </el-select>
        </el-form-item>
        
        <el-form-item label="新闻图片">
          <el-upload multiple action="/api/news/uploadImg" list-type="picture-card"
            :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :limit="3" :on-error="handleErr"
            :on-change="handleChange">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="发布时间">
               <el-date-picker
            v-model="publishTime"
            type="datetime"
            placeholder="选择发布日期时间"
            :clearable="false"
            :picker-options="pickerOptions"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            style="width:220px"
            >
          </el-date-picker>
        </el-form-item>

        <el-form-item align="right">
          <el-button @click="next()" type="primary">下一步</el-button>
        </el-form-item>
      </div>

      <div class="n2" v-show="active == 1">
        <el-form-item label="新闻内容" prop="jj">
          <div id="editor" ref="editor"></div>
        </el-form-item>
         <el-form-item align="right">
          <el-button @click="prev()" type="primary">上一步</el-button>
          <el-button @click="next()" type="primary">提交新闻</el-button>
        </el-form-item>
        
      </div>
 <div class="n3" v-show="active >= 2">
  <div style="display:flex;justify-content:center;margin:40px auto;    flex-direction: column; align-items: center;">
  <el-progress type="circle" :percentage="percent" :status="status"></el-progress>
  <br>
  <span style="    font-size: .8rem;
    color: gray;">
  {{status == 'success'?'发布成功' :'发布失败'}}

  </span>
  </div>

<div v-if="status == 'success'" align="center">
   <!-- <el-button @click="prev()" type="primary"></el-button> -->
          <el-button @click="$router.push('/')" >前往新闻中心</el-button>
          <el-button @click="goThis" type="primary">查看该条新闻</el-button>   

        </div>
        <div align="center" v-else>
   <!-- <el-button @click="prev()" type="primary"></el-button> -->
          <el-button @click="prev()" type="primary">上一步</el-button>
          <el-button @click="$router.go('/publish')" type="primary">重新发布</el-button>
        </div>
        <br>
        <br>
        <br>
 </div>

      <el-dialog  :visible.sync="dialogVisible">
        <img :src="dialogImageUrl" alt="">
      </el-dialog>

    </el-form>
  </div>
</template>
<style lang="less" scoped>
/deep/.el-step{
  .is-{
  color:goldenrod;

  }
  .is-success{
    color:#67C23A !important;
  }

}

/deep/.el-dialog__body{
  display: flex;
  justify-content: center;
  align-items: flex-start;
  // padding: 0 20px;

  img{
    transform: scale(.9)
  }
}
</style>

<script>
  import Editor from 'wangEditor'
  import {
    postNews,
    getCate
  } from './../api/news';
  import { getStorage } from "./../tools/storage";
  var editor = new Editor('#editor');
  export default {
    watch:{
      active(el){
        if(el == 2){
          this.submit();
        }

      }
    },
    data() {
      return {
        categoryList: [],
        form: {
          title: "",
          desc: "",
          writer:'',
        },
        active: 0,
        category: "",
        imgs: [],
        dialogVisible: false,
        dialogImageUrl: '',
        percent:0,
        status:'',
        successID:'',
        ps:'',
        rules: {
          title: [{
              required: true,
              message: '请输入新闻标题',
              trigger: 'blur'
            },
            {
              min: 5,
              max: 200,
              message: '长度在 5到 200 个字符',
              trigger: 'blur'
            }
          ],
          desc: [{
              required: true,
              message: '请输入新闻描述',
              trigger: 'blur'
            },
            {
              min: 5,
              max: 1000,
              message: '长度在 5 到 1000 个字符',
              trigger: 'blur'
            }
          ],
            writer: [{
              required: true,
              message: '请输入作者',
              trigger: 'blur'
            },
            {
              min: 1,
              max: 100,
              message: '长度在 5 到 1000 个字符',
              trigger: 'blur'
            }
          ]
        },
        publishTime:new Date(),
        pickerOptions: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, 
          {
            text: '三天前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 3);
              picker.$emit('pick', date);
            }
          },
          {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          },
          {
            text: '一个月前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 30 * 1);
              picker.$emit('pick', date);
            }
          },
          {
            text: '三个月前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 30 * 3);
              picker.$emit('pick', date);
            }
          },
          
          
          ]
        },
      }
    },
    methods: {
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      remoteMethod() {
        return getCate().then(r => {
          if (r.data.code == 200) {
            this.categoryList = r.data.data.map(el => ({
              label: el.catename,
              value: el.id
            }));
          }
          return (this.categoryList[0] || {
            value: 0,
            label: '默认'
          })
        })
      },
      goThis(){
        this.$router.push('/detail?id=' + this.successID)
      },
      getImg(fl) {
        var res = fl.reduce((t, el) => {
          for (var img of el.response.info) {
            t.add(img)
          }
          return t
        }, new Set())
        this.imgs = Array.from(res)
      },
      handleChange(f, fl) {
        console.log(f, fl);
        if (f.status == "success") {
          this.getImg(fl);
        }
      },
      submit() {

        var data = {
          title: this.form.title,
          desc: this.form.desc,
          bigText: editor.txt.html(),
          imgs: this.imgs.toString(),
          cate: this.category,
          pushTime:this.pushTime,
          writer:this.form.writer
        }
        this.$refs['form'].validate((valid) => {
          if (valid) {
            postNews(data).then(res => {
              if(res.data.code == 200){
              this.percent= 100;
              this.successID = res.data.data.id
              this.status = 'success'
                this.active++

              }else{
                this.percent= 100;
                this.status = 'exception';
                this.ps= 'error'
              }
            })
          
          }
        })
      },
      next(){
         this.ps= ''
        this.$refs['form'].validate((valid) => {
          if(valid)
        this.active++;})
      },prev(){
         this.ps= ''
        this.active--;

      },
      handleRemove(f, fl) {
        this.getImg(fl);
      },
      handleErr(err, f, fl) {
        this.$message.error('文件上传失败，请联系管理员！');
      }
    },
    mounted() {
      // 创建编辑器
      this.remoteMethod().then(r => {
        // console.log(r)
        this.category = r.value;
      })
      editor.customConfig.uploadImgShowBase64 = true;
      editor.customConfig.emotions = [{
        title: 'emoji',
        type: 'emoji',
        content: ['😀', '😃', '😄', '😁', '😆', '❤️', '😂',
          '🤣', '😄', '😅', '😉', '😊', '😋', '😎', '😍',
          '😘', '😓', '😤', '😀', '😃', '😄', '😁', '😆', '❤️', '😂',
          '🤣', '😄', '😅', '😉', '😊', '😋', '😎', '😍',
          '😘', '😓', '😤', '😀', '😃', '😄', '😁', '😆', '❤️', '😂',
          '🤣', '😄', '😅', '😉', '😊', '😋', '😎', '😍',
          '😘', '😓', '😤', '😀', '😃', '😄', '😁', '😆', '❤️', '😂',
          '🤣', '😄', '😅', '😉', '😊', '😋', '😎', '😍',
          '😘', '😓', '😤'
        ]
      }]
      editor.customConfig.zIndex = 100
      editor.create();
      var {userName} = getStorage({name:'token'})
      this.form.writer = userName


    }
  }
</script>