const v = '/v1';
const api = {
    public:{
        checkAuthentication:v+"/aplus-jx-public/universal/user/checkAuthentication",
        me:v+"/aplus-jx-study/student/api/me",
        school:"/api/student/student/querybyuid", // uid
        student:"/api/student/query",
        dictionary:"/api/dictionary",
        studentDetail:"/api/student/query-by-token",
        bind_teant:"/api/user/bind-tenant"  // 绑定租户
    },
    // 已约
    al:{
        already:"/api/student/course/record/query"
    },
    login:{
        code:"/api/wxuser/login", // 获取openid
        phone:"/api/wxuser/encryption", // 解密手机号
        send:"/api/sms/send",
        vlogin:"/api/user/vcode-login",
        verification:"/api/wxuser/verification", // 登陆
        authentication:v+"/aplus-jx-public/universal/user/authentication",
        appAuthentication:v+"/aplus-jx-public/universal/user/appAuthentication"
    },
    coach:{
        querySite:"/api/assetmanage/query-site", // 全部训练场
        queryAllCoach:"/api/schooladministration/get-coach-list", // 查询教练
        changeCoach:"/api/student/change-coach", // 选择教练
        coachDetail:"/api/schooladministration/get-employee",
        siteDetail:"/api/assetmanage/get-site" //场地详情接口
    },
    home:{
        getOpenid:"/group/wx/user/getOpenid",
        authentication:v+"/aplus-jx-public/universal/user/authentication",
        save:v+"/aplus-jx-index/index/activity/user/save",  // 学车意向
    },
    my:{
        studyHistory:"/api/student/history", // 学习历程
        classtype:v+"/aplus-class/classtype/queryById", // 班型介绍
        addOrUpdate:"/api/leavemsg/save" // 意见反馈
    },
    reducible:{
        calendar:"/api/student/course/query-calendar-coursedates",
        queryById:v+"/aplus-jx-finance/site/queryById",
        getStudentByCondition:v+"/aplus-jx-study/student/getStudentByCondition", // 约课规则
        queryAll:"/api/student/course/query-calendar-course",   // 查询课程
        book:"/api/student/course/order",// 预约接口
        bookQuery:"/api/student/course/order/result/query",
    },
    classType:{
        query:"/api/education/get-class",
        increment:"/api/value-added/get-all" // 增值服务
    },
    already:{
        alreadyBooked:v+"/aplus-jx-study/course/booked/record/alreadyBooked",
        sign:"/api/student/course/record/update",
        cancel:"/api/student/course/record/cancel"
    },
    activity:{
        myGroups:"/group/wx/user/myGroups",
        detail:"/group/wx/user/detail",
        saveUser:"/group/wx/user/saveUser",
        saveGroupDoc:"/group/wx/user/saveGroupDoc", // 开团
        joinGroup:"/group/wx/user/joinGroup",   // 参团
        list:"/group/wx/user/list", // 参团列表
        statistics:"/statistic/record", // 统计转发次数
    },
    clue:{
        trial:"https://test.api.aplusx.com/apijx/v1/aplus-jx-schooladministration/clue/save",
        // trial:"https://api.aplusx.com/jiaxiao/v1/aplus-jx-schooladministration/clue/save"
    },
    // 批量约课
    batch:{
        query:"/api/student/course/query-course-for-miniapp-batch",
        book:"/api/student/course/batch/order",
        bookQuery:"/api/student/course/order/result/batch/query"
    },
    school:{
        query:"/api/student/query-all-tenantId", // 驾校列表
        binding:"/api/student/binding-school",
    },
    more:{
        query:"/api/student/course/query"
    }
}
export default api;