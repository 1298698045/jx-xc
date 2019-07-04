const v = '/v1';
const api = {
    public:{
        checkAuthentication:v+"/aplus-jx-public/universal/user/checkAuthentication",
        me:v+"/aplus-jx-study/student/api/me"
    },
    login:{
        send:v+"/aplus-jx-public/sms/send",
        verification:v+"/aplus-jx-public/sms/verification",
        authentication:v+"/aplus-jx-public/universal/user/authentication",
        appAuthentication:v+"/aplus-jx-public/universal/user/appAuthentication"
    },
    coach:{
        querySite:v+"/aplus-jx-finance/site/querySite", // 全部训练场
        queryAllCoach:v+"/aplus-jx-schooladministration/employee/queryAllCoach",
        changeCoach:v+"/aplus-jx-study/student/changeCoach" // 选择教练
    },
    home:{
        getOpenid:v+"/aplus-jx-koiactivity/group/wx/user/getOpenid",
        authentication:v+"/aplus-jx-public/universal/user/authentication",
        save:v+"/aplus-jx-index/index/activity/user/save",  // 学车意向
    },
    my:{
        studyHistory:v+"/aplus-jx-study/studyHistory/queryAll", // 学习历程
        classtype:v+"/aplus-class/classtype/queryById", // 班型介绍
        addOrUpdate:v+"/aplus-yunying/opinion/addOrUpdate" // 意见反馈
    },
    reducible:{
        queryById:v+"/aplus-jx-finance/site/queryById",
        getStudentByCondition:v+"/aplus-jx-study/student/getStudentByCondition", // 约课规则
        queryAll:v+"/aplus-jx-study/course/queryAll",   // 查询课程
        book:v+"/aplus-jx-study/course/booked/record/book"
    },
    already:{
        alreadyBooked:v+"/aplus-jx-study/course/booked/record/alreadyBooked",
        sign:v+"/aplus-jx-study/course/booked/record/sign",
        cancel:v+"/aplus-jx-study/course/booked/record/cancel"
    },
    activity:{
        myGroups:v+"/aplus-jx-koiactivity/group/wx/user/myGroups",
        detail:v+"/aplus-jx-koiactivity/group/wx/user/detail",
        saveUser:v+"/aplus-jx-koiactivity/group/wx/user/saveUser",
        saveGroupDoc:v+"/aplus-jx-koiactivity/group/wx/user/saveGroupDoc", // 开团
        joinGroup:v+"/aplus-jx-koiactivity/group/wx/user/joinGroup",   // 参团
        list:v+"/aplus-jx-koiactivity/group/wx/user/list", // 参团列表
        statistics:v+"/aplus-jx-koiactivity/statistic/record", // 统计转发次数
    },
    clue:{
        trial:"https://test.api.aplusx.com/apijx/v1/aplus-jx-schooladministration/clue/save",
        // trial:"https://api.aplusx.com/jiaxiao/v1/aplus-jx-schooladministration/clue/save"
    }
}
export default api;