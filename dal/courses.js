let mySql = require('../Config/mysql_config.js');

class courses{
    constructor(){

    }

    getAllCoursesInCbaNotInLms(semester, callback){
        let sqlCoursesInCbaNotInLms = this.setSqlAllCoursesInCbaNotInLms(semester);
        mySql.query(sqlCoursesInCbaNotInLms, function(err, result){
            if(err){
                console.log(err);
                mySql.end();
                callback(err, null);
            }
            console.log(result);
            mySql.end();
            callback(null, result);
        })
        console.log("Inside get courses");
    }

    getDeptCoursesInCbaNtLms(departmentTitle, semester, callback){
        let sqlDeptCoursesInCbaNtLms = this.setSqlDeptCoursesInCbaNotInLms(departmentTitle, semester);

        mySql.query(sqlDeptCoursesInCbaNtLms, function(err, result){
            if(err){
                console.log("Error in getDeptCoursesInCbaNotInLms");
                console.log(err);
                callback(err, null);
                return;
            }
            console.log("Successfully executed query sqlDeptCoursesInCbaNotInLms");
            callback(null, result);
        })
    }

    getDeptCoursesInLmsNotInCba(departmentTitle, semester){
        console.log("Inside DAL for Department Courses in LMS Not In CBA");


    }

    setSqlDeptCoursesInLmsNotInCba(departmentTitle, semester){
        let query = "";
    }
    setSqlDeptCoursesInCbaNotInLms(departmentTitle, semester){

        console.log("\n\n\nInside DAL course set sql department courses in cba not in lms");
        
        var sqlCoursesInCbaNotInLms = " SELECT DISTINCT(Cba_Courses.CBA_Code), Cba_Courses.department_title, Cba_Courses.course_title\
                                    FROM\
                                    (select DISTINCT(concat(t.templatecourse_code,'-',d.department_shortCode,'-181-',sc.section_title)) AS CBA_Code,\
                                    e.enrollment_id, e.studentID, t.deptID, e.courseID, e.enrollment_status, c.templateCourseID, c.academicSessionID,\
                                    d.department_title, c.course_title, d.department_shortCode\
                                    from enrollments e\
                                    inner join courses c on c.course_id = e.courseID\
                                    inner join templatecourses t on t.templatecourse_id = c.templateCourseID\
                                    inner join course_section_allocation			csa 	on csa.courseid = e.courseID\
                                    inner join sections 					sc 	on sc.section_id = csa.sectionid\
                                    inner join departments					d 	on d.department_id = t.deptID\
                                    inner join course_additional_teacher_allocation		cta 	on cta.courseid = c.course_id\
                                    inner join teachers					tch 	on tch.teacher_id = cta.teacherid\
                                    inner join academicsessions 				a 	on a.academicsessions_id = c.academicSessionID\
                                    inner join semestertypes				sem 	on sem.semestertype_id = a.semesterTypeID\
                                        where c.academicSessionID = 21\
                                    and e.enrollment_status=0) AS Cba_Courses\
                                    LEFT JOIN\
                                    (SELECT DISTINCT(courses.shortname) AS shortname, courses.fullname, departments.name\
                                    FROM CBA_LMS_MERGE.mdl_course AS courses\
                                    \
                                    INNER JOIN (SELECT courseCat.name, courseCat.id, courseCat.parent\
                                            FROM CBA_LMS_MERGE.mdl_course_categories AS courseCat\
                                            WHERE courseCat.parent = (SELECT courseCat2.id\
                                                            FROM CBA_LMS_MERGE.mdl_course_categories AS courseCat2\
                                                            WHERE courseCat2.name = \"" + semester + "\")) AS departments\
                                                            ON courses.category = departments.id) AS Lms_Courses\
                                    ON Lms_Courses.shortname= Cba_Courses.CBA_Code\
                                    WHERE shortname IS NULL\
                                    AND Cba_Courses.department_shortCode = \"" + departmentTitle + "\" ";
                                    return sqlCoursesInCbaNotInLms;        
    }
    setSqlAllCoursesInCbaNotInLms(semester){

        console.log("\n\n\nInside DAL course set sql all courses in cba not in lms");

        var sqlCoursesInCbaNotInLms = " SELECT DISTINCT(Cba_Courses.CBA_Code), Cba_Courses.department_title, Cba_Courses.course_title\
                                    FROM\
                                    (select DISTINCT(concat(t.templatecourse_code,'-',d.department_shortCode,'-181-',sc.section_title)) AS CBA_Code,\
                                    e.enrollment_id, e.studentID, t.deptID, e.courseID, e.enrollment_status, c.templateCourseID, c.academicSessionID,\
                                    d.department_title, c.course_title\
                                    from enrollments e\
                                    inner join courses c on c.course_id = e.courseID\
                                    inner join templatecourses t on t.templatecourse_id = c.templateCourseID\
                                    inner join course_section_allocation			csa 	on csa.courseid = e.courseID\
                                    inner join sections 					sc 	on sc.section_id = csa.sectionid\
                                    inner join departments					d 	on d.department_id = t.deptID\
                                    inner join course_additional_teacher_allocation		cta 	on cta.courseid = c.course_id\
                                    inner join teachers					tch 	on tch.teacher_id = cta.teacherid\
                                    inner join academicsessions 				a 	on a.academicsessions_id = c.academicSessionID\
                                    inner join semestertypes				sem 	on sem.semestertype_id = a.semesterTypeID\
                                        where c.academicSessionID = 21\
                                    and e.enrollment_status=0) AS Cba_Courses\
                                    LEFT JOIN\
                                    (SELECT DISTINCT(courses.shortname) AS shortname, courses.fullname, departments.name\
                                    FROM CBA_LMS_MERGE.mdl_course AS courses\
                                    \
                                    INNER JOIN (SELECT courseCat.name, courseCat.id, courseCat.parent\
                                            FROM CBA_LMS_MERGE.mdl_course_categories AS courseCat\
                                            WHERE courseCat.parent = (SELECT courseCat2.id\
                                                            FROM CBA_LMS_MERGE.mdl_course_categories AS courseCat2\
                                                            WHERE courseCat2.name = \"" + semester + "\")) AS departments\
                                                            ON courses.category = departments.id) AS Lms_Courses\
                                    ON Lms_Courses.shortname= Cba_Courses.CBA_Code\
                                    WHERE shortname IS NULL";
                                
                                    return sqlCoursesInCbaNotInLms;
    }
}

module.exports = courses;