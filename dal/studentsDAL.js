let mySql = require('../Config/mysql_config.js');

class studentEnrollments{
    constructor(){

    }

    getAllStdEnrInCbaNotInLms(semester, callback){
        let queryEnrInCbaNtInLms = this.getQueryStdEnrInCbaNotInLms(semester);
        mySql.query(queryEnrInCbaNtInLms, function(err, result){
            if(err){
                console.log(err);
                callback(err, null);
            }
            console.log("Query for enrollments in CBA but not in LMS executed Successfully");
            mySql.end();
            callback(null, result);
        })
    }

    getQueryStdEnrInCbaNotInLms(semester){
        console.log("Inside Create Query for Enroll in CBA Not in LMS");

        let query = "SELECT CBA_Students_Enrollments.regnumber, CBA_Students_Enrollments.firstname,\
                    CBA_Students_Enrollments.student_lastname, CBA_Students_Enrollments.course_title,\
                    CBA_Students_Enrollments.department_shortCode\
                    FROM (select concat(s.student_firstname, ' ',s.student_middlename) AS firstname,\
                    e.enrollment_id, e.studentID,t.deptID,e.courseID,e.enrollment_status,c.templateCourseID,c.academicSessionID,\
                    s.regNumber AS regnumber,\
                    s.student_lastname,\
                    d.department_shortCode,\
                    c.course_title, 'add' as Action1, 'del' as Action2, 'student' as 'LMS User Role1', 'editingteacher' as 'LMS User Role2', concat(t.templatecourse_code,'-',d.department_shortCode,'-181-',sc.section_title) as LMS_Course_Id from enrollments e inner join courses c on c.course_id = e.courseID AND c.academicSessionID = 21 inner join templatecourses				t 	on t.templatecourse_id = c.templateCourseID\
                    AND  e.enrollment_status=0\
                    inner join course_section_allocation			csa 	on csa.courseid = e.courseID\
                    inner join sections 					sc 	on sc.section_id = csa.sectionid\
                    inner join students 					s 	on s.student_id = e.studentID\
                    inner join departments					d 	on d.department_id = t.deptID\
                    inner join course_additional_teacher_allocation		cta 	on cta.courseid = c.course_id\
                    inner join academicsessions 				a 	on a.academicsessions_id = c.academicSessionID\
                    inner join semestertypes				sem 	on sem.semestertype_id = a.semesterTypeID\
                    ) AS CBA_Students_Enrollments\
                    WHERE concat(CBA_Students_Enrollments.LMS_Course_Id, CBA_Students_Enrollments.regnumber)  NOT IN\
                    (\
                        SELECT concat(courses.shortname, user.username) AS userCourse\
                        FROM mdl_course AS courses\
                        INNER JOIN (SELECT courseCat.id\
                            FROM mdl_course_categories AS courseCat\
                            WHERE courseCat.parent = (SELECT courseCat2.id\
                                            FROM mdl_course_categories AS courseCat2\
                                            WHERE courseCat2.name = \"" + semester + "\")) AS departments\
                                            ON courses.category = departments.id\
                        INNER JOIN mdl_context AS context\
                        ON  courses.id = context.instanceid\
                        INNER JOIN mdl_role_assignments AS roleAssignments\
                        ON context.id = roleAssignments.contextid\
                        INNER JOIN mdl_user AS user\
                        ON roleAssignments.userid = user.id\
                        WHERE context.contextlevel = 50\
                        AND roleAssignments.roleid = 12\
                    )";

                        return query;
    }

    getStdEnrInLmsNotInCba(query){

    }

    getQueryStdEnrInLmsNotInCba(){
        let query = ""
    }
}
module.exports = studentEnrollments;