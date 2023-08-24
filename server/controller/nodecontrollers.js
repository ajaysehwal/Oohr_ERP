const db = require("../config/dbcon");
const crypto = require('crypto');

const defaultapi = (req, res) => {
  res.setHeader("Content-Type", "application/json");

  res.send({ Message: "Welcome to our school management system" });
};

const signup = (req, res) => {
  const sql = "SELECT * FROM `signupstep1`";

  db.query(sql, (err, data) => {
    if (err) {
      return res.json("Error");
    } else {
      return res.json(data);
    }
  });
};
const signupemail = (req, res) => {
  res.setHeader("Content-Type", "application/json");

  const emailid = req.params.email;
  console.log(emailid);
  const sql = "SELECT * FROM `signupstep1` WHERE email=?";
  db.query(sql, emailid, (err, data) => {
    if (err) {
      return err;
    } else {
      return res.json(data);
    }
  });
};
const signuppost = (req, res) => {
  const schoolname = req.body.schoolname;
  const schoolurl = req.body.schoolurl;
  const email = req.body.email;
  const phone = req.body.phone;
  const user_token = req.body.user_token;

  const sql =
    "INSERT INTO `signupstep1`(`schoolname`,`schoolurl`,`email`,`phone`,`user_token`) VALUES (?,?,?,?,?)";

  db.query(
    sql,
    [schoolname, schoolurl, email, phone, user_token],
    (err, data) => {
      if (err) {
        return res.json(err);
      }

      return res.json(data);
    }
  );
};

const apisignupid = (req, res) => {
  res.setHeader("Content-Type", "application/json");

  const userid = req.params.id;
  console.log(userid);
  const sql = "SELECT * FROM `signupstep1` WHERE user_token=?";
  db.query(sql, userid, (err, data) => {
    if (err) {
      return err;
    } else {
      return res.json(data);
    }
  });
};
const register_address_post = (req, res) => {
  const user_token = req.body.user_token;
  const country = req.body.country;
  const address = req.body.address;

  const sql =
    "INSERT INTO `signupstep2-address`(`user_token`,`country`,`schooladdress`) VALUES (?,?,?)";

  db.query(sql, [user_token, country, address], (err, data) => {
    if (err) {
      return res.json(err);
    }

    return res.json(data);
  });
};
const register_address_get_id = (req, res) => {
  res.setHeader("Content-Type", "application/json");

  const userid = req.params.id;
  // console.log(emailid);
  const sql = "SELECT * FROM `signupstep2-address` WHERE user_token=?";
  db.query(sql, userid, (err, data) => {
    if (err) {
      return err;
    } else {
      return res.json(data);
    }
  });
};
const register_address_get = (req, res) => {
  const sql = "SELECT * FROM `signupstep2-address`";

  db.query(sql, (err, data) => {
    if (err) {
      return res.json("Error");
    } else {
      return res.json(data);
    }
  });
};
const admindata_post = (req, res) => {
  const user_token = req.body.user_token;
  const admin_name = req.body.admin_name;
  const admin_email = req.body.admin_email;
  const admin_password = req.body.admin_password;
  const admin_phone = req.body.admin_phone;
  const admin_confirmPassword = req.body.admin_confirmPassword;
  const school_id=req.body.school_id;

  const sql =
    "INSERT INTO `signup-info`(`user_token`,`admin_name`,`admin_email`, `admin_password`, `admin_phone`,`admin_confirmPassword`,`school_id`) VALUES (?,?,?,?,?,?,?)";

  db.query(
    sql,
    [
      user_token,
      admin_name,
      admin_email,
      admin_password,
      admin_phone,
      admin_confirmPassword,
      school_id,
    ],
    (err, data) => {
      if (err) {
        return res.json(err);
      }

      return res.json(data);
    }
  );
};
const admindata_get_id = (req, res) => {
  res.setHeader("Content-Type", "application/json");

  const userid = req.params.id;
  // console.log(emailid);
  const sql = "SELECT * FROM `signup-info` WHERE user_token=?";
  db.query(sql, userid, (err, data) => {
    if (err) {
      return err;
    } else {
      return res.json(data);
    }
  });
};

const admindata_get_email = (req, res) => {
  res.setHeader("Content-Type", "application/json");

  const userid = req.params.id;
  // console.log(emailid);
  const sql = "SELECT * FROM `signup-info` WHERE admin_email=?";
  db.query(sql, userid, (err, data) => {
    if (err) {
      return err;
    } else {
      return res.json(data);
    }
  });
};
const admindata_get = (req, res) => {
  res.setHeader("Content-Type", "application/json");

  // console.log(emailid);
  const sql = "SELECT * FROM `signup-info`";
  db.query(sql, (err, data) => {
    if (err) {
      return err;
    } else {
      return res.json(data);
    }
  });
};

const classes_get = (req, res) => {
  const sql = "SELECT * FROM `studentclasses`";
  res.setHeader("Content-Type", "application/json");

  db.query(sql, (err, data) => {
    if (err) {
      return err;
    } else {
      return res.json(data);
    }
  });
};
const classes_post = (req, res) => {
  const class_name = req.body.class_name;
  const user_token = req.body.user_token;
  const class_descripition = req.body.class_descripition;

  const sql =
    "INSERT INTO `studentclasses`(`class_name`,`user_token`,`class_descripition`) VALUES (?,?,?)";
  db.query(
    sql,
    [class_name, user_token, class_descripition],
    (err, data) => {
      if (err) {
        return err;
      } else {
        return res.json(data);
      }
    }
  );
};
const classes_get_id = (req, res) => {
  const userid = req.params.id;
  // console.log(emailid);
  const sql = "SELECT * FROM `studentclasses` WHERE user_token=?";
  db.query(sql, userid, (err, data) => {
    if (err) {
      return err;
    } else {
      return res.json(data);
    }
  });
};

const classes_get_search = (req, res) => {
  const searchTerm = req.params.id;
  console.log(searchTerm);
  const query = 'SELECT * FROM `studentclasses` WHERE `class_name` LIKE ?';
  db.query(query, [`%${searchTerm}%`], (error, results) => {
    if (error) {
      console.error('Error occurred:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  });
}
const classes_get_all_search = (req, res) => {
  const sql = "SELECT * FROM `studentclasses`";
  res.setHeader("Content-Type", "application/json");

  db.query(sql, (err, data) => {
    if (err) {
      return err;
    } else {
      return res.json(data);
    }
  });
}
const class_delete = (req, res) => {
  const key = req.query.key;
  const sql = "DELETE FROM `studentclasses` WHERE id=?";
  db.query(sql, key, (err, data) => {
    if (err) {
      return err
    } else {
      return res.json(data);
    }
  })
}
const class_limit = (req, res) => {
  const { page, limit } = req.query;
  const offset = (page - 1) * limit;

  const query = 'SELECT * FROM `studentclasses` LIMIT ? OFFSET ?';
  db.query(query, [limit, offset], (error, results) => {
    if (error) {
      console.error('Error executing MySQL query:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  });
}
const studenthouse_get = (req, res) => {
  const query = "SELECT * FROM `studenthouses`";
  db.query(query, (err, data) => {
    if (err) {
      res.status(500).json({ err: 'Internal Server Error' });
    } else {
      res.json(data);
    }
  })
}
const studenthouse_post = (req, res) => {
  const reqdata = [
    req.body.house_name,
  
    req.body.user_token,
  ]
  const query = "INSERT INTO `studenthouses`(`house_name`,`user_token`) VALUES (?,?)"
  db.query(query, reqdata, (err, data) => {
    if (err) {
      res.status(500).json({ err: 'Internal Server Error' });
    } else {
      res.json(data);
    }
  })
}
const studenthouse_get_id = (req, res) => {
  const token = req.params.id;
  const query = "SELECT * FROM `studenthouses` WHERE user_token=?";
  db.query(query, token, (err, data) => {
    if (err) {
      res.status(500).json({ err: 'Internal Server Error' });
    } else {
      res.json(data);
    }
  })
}
const studenthouse_scan_dublicate = (req, res) => {
  const {name,school_id} = req.params;
  const query = "SELECT * FROM `studenthouses` WHERE house_name=? AND user_token=?";
  db.query(query, [name,school_id], (err, data) => {
    if (err) {
      res.status(500).json({ err: 'Internal Server Error' });
    } else {
      res.json(data);
    }
  })
}
 
const studenthouse_delete = (req, res) => {
  const key = req.params.key;
  const sql = "DELETE FROM `studenthouses` WHERE id=?";
  db.query(sql, key, (err, data) => {
    if (err) {
      return err
    } else {
      return res.json(data);
    }
  })
}
const Student_post = (req, res) => {
  const { file1, file2, file3 } = req.files;
  const randomCode = crypto.randomBytes(6).toString('hex').toUpperCase();

  const studentdata = [
    req.body.student_name,
    req.body.date_of_birth,
    req.body.father_name,
    req.body.mother_name,

    req.body.mother_tougue,
    req.body.address,
    req.body.nationality,
    req.body.admission_no,
    req.body.age,
    req.body.religion,
    req.body.city,
    req.body.phone,
    req.body.parents_phone,
    req.body.previous_school_name,
    req.body.class_in_which_was_studing,
    req.body.email,
    req.body.transfer_certificate,
    req.body.physical_handicap,
    req.body.house,
    req.body.student_category,
    req.body.select_class,
    req.body.section,
    req.body.place_birth,
    req.body.state,
    req.body.blood_group,
    req.body.dateofleaving,
    file1[0].path,
    req.body.birth_certificate,
    file3[0].path,
    req.body.additional_information,
    file2[0].path,
    req.body.gender,
    req.body.admin_token,
    randomCode
  ]
  console.log(studentdata);
  const sql = "INSERT INTO `studentdata`(`student_name`, `date_of_birth`, `father_name`, `mother_name`, `mother_tougue`, `address`, `nationality`, `admission_no`, `age`, `religion`, `city`, `phone`, `parents_phone`, `previous_school_name`, `class_in_which_was_studing`, `email`, `transfer_certificate`, `physical_handicap`, `house`, `student_category`, `select_class`,`section`,`place_birth`, `state`, `blood_group`, `dateofleaving`, `student_document`, `birth_certificate`, `student_image`, `additional_information`, `other_document`,`gender`,`admin_token`,`student_code`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
  db.query(sql, studentdata, (err, data) => {
    if (err) {
      return err
    } else {
      res.send(data);
      console.log(data);
    }
  })
}

const getstudent_data = (req, res) => {
  const id=req.params.school_id;
  const sql = "SELECT * FROM `studentdata` WHERE admin_token=?";
  db.query(sql,id, (err, data) => {
    if (err) {
      return err
    } else {
      res.send(data);
    }
  })
}
const getstudent_data_by_gender = (req, res) => {
  const {school_id,gender}=req.params;
  const sql = "SELECT * FROM `studentdata` WHERE admin_token=? AND gender=?";
  db.query(sql,[school_id,gender], (err, data) => {
    if (err) {
      return err
    } else {
      res.send(data);
    }
  })
}
const getstudent_data_by_class_section=(req,res)=>{
  const {classes,section,school_id}=req.params;
  const sql="SELECT * FROM `studentdata` WHERE select_class=? AND section=? AND admin_token=?";
  db.query(sql,[classes,section,school_id],(err,data)=>{
    if(err){
      res.send(err);
    }else{
      res.send(data);
    }
  })

}

const getstudent_data_by_class=(req,res)=>{
  const {classes,school_id}=req.params;
  const sql="SELECT * FROM `studentdata` WHERE select_class=? AND admin_token=?";
  db.query(sql,[classes,school_id],(err,data)=>{
    if(err){
      res.send(err);
    }else{
      res.send(data);
    }
  })
}
const getstudent_data_admission_no = (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM `studentdata` WHERE admission_no=?";
  db.query(sql, id, (err, data) => {
    if (err) {
      return err;
    } else {
      res.send(data);
    }
  })
}
const xlsx = require('xlsx');
const poststudentdata_excel = (req, res) => {
  const workbook = xlsx.readFile(req.file.path);
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  let range = xlsx.utils.decode_range(worksheet["!ref"]);
  for (let row = range.s.r; row <= range.e.r; row++) {
    let data = [];
    for (let col = range.s.c; col <= range.e.c; col++) {
      let cell = worksheet[xlsx.utils.encode_cell({ r: row, c: col })];

      data.push(cell.v);

    }
    const baseDate = new Date(Date.UTC(1900, 0, 1));
    const realDate = new Date(baseDate.getTime() + (data[1] || 0 - 2) * 86400000).toISOString().slice(0, 10);

    const studentdata = [
      data[0] || '',
      realDate || 0,
      data[2] || '',
      data[3] || '',
      data[4] || '',
      data[5] || '',
      data[6] || '',
      data[7] || '',
      data[8] || '',
      data[9] || '',
      data[10] || '',
      data[11] || '',
      data[12] || '',
      data[13] || '',
      data[14] || '',
      data[15] || '',
      data[16] || '',
      data[17] || '',
      data[18] || '',
      data[19] || '',
     req.body.class,
     req.body.section,
      data[20] || '',
      data[21] || '',
      data[22] || '',
      data[23] || '',
      data[24] || '',
      data[25] || '',
      data[26] || '',
      data[27] || '',
      data[28] || '',
      data[29] || '',
      req.body.admin_token,
    ]
    const sql = "INSERT INTO `studentdata`(`student_name`, `date_of_birth`, `father_name`,`mother_name`, `mother_tougue`, `address`, `nationality`, `admission_no`, `age`, `religion`, `city`, `phone`, `parents_phone`, `previous_school_name`, `class_in_which_was_studing`, `email`, `transfer_certificate`, `physical_handicap`, `house`, `student_category`, `select_class`, `section`, `place_birth`, `state`, `blood_group`, `dateofleaving`, `student_document`, `birth_certificate`, `student_image`, `additional_information`, `other_document`,`gender`,`admin_token`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
    db.query(sql, studentdata, (err, data) => {
      if (err) {
        res.send(err)
      } else {
        res.send(data);
      }
    })
  }
}


const postteacher_data = (req, res) => {
  const randomCode = crypto.randomBytes(6).toString('hex').toUpperCase();

  const { file1, file2 } = req.files;

  const data = [
    req.body.name,
    req.body.dob,
    req.body.gender,
    req.body.religion,
    req.body.bloodgroup,
    req.body.email,
    req.body.phone,
    req.body.qualification,
    req.body.martial_status,
    req.body.address,
    req.body.facebook,
    req.body.twitter,
    req.body.linkedin,
    req.body.department,
    req.body.dateofjoining,
    req.body.joiningsalary,
    req.body.status,
    req.body.accountholdername,
    req.body.accountnumber,
    req.body.bankname,
    req.body.branch,
    file1[0].path,
    file2[0].path,
    req.body.school_id,
    randomCode
  ]

  const sql = "INSERT INTO `teachersdata`(`name`, `dob`, `gender`, `religion`, `bloodgroup`, `email`, `phone`, `qualification`, `martialstatus`, `address`, `facebook`, `twitter`, `linkedin`, `department`, `dateofjoining`, `joiningsalary`, `status`, `accountholdername`, `accountnumber`, `bankname`, `branch`, `identifydocument`, `img`, `school_id`, `teacher_id`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
  db.query(sql, data, (err, data) => {
    if (err) {
       res.send(err);
    } else {
      res.send(data);
    }
  })
  
}


const nonteacher_post=(req,res)=>{
  const randomCode = crypto.randomBytes(6).toString('hex').toUpperCase();

  const { file1, file2 } = req.files;
  const sqldata=[
    req.body.name,
    req.body.dob,
    req.body.gender,
    req.body.religion,
    req.body.bloodgroup,
    req.body.email,
    req.body.phone,
    req.body.qualification,
    req.body.martial_status,
    req.body.address,
    req.body.facebook,
    req.body.twitter,
    req.body.linkedin,
    req.body.department,
    req.body.dateofjoining,
    req.body.joiningsalary,
    req.body.status,
    req.body.accountholdername,
    req.body.accountnumber,
    req.body.bankname,
    req.body.branch,
    file1[0].path,
    file2[0].path,
    req.body.school_id,
    randomCode,
  ]
  const sql="INSERT INTO `nonteachingstaff`(`name`, `dob`, `gender`, `religion`, `bloodgroup`, `email`, `phone`, `qualification`, `martialstatus`, `address`, `facebook`, `twitter`, `linkedin`, `department`, `dateofjoining`, `joiningsalary`, `status`, `accountholdername`, `accountnumber`, `bankname`, `branch`, `identitydocument`, `img`, `school_id`, `teacher_id`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
   db.query(sql,sqldata,(err,data)=>{
    if(err){
      res.send(err);
    }else{
    res.send(data);
    }
   })
}
const nonteacher_get=(req,res)=>{
  const {school_id}=req.params;
  const sql="SELECT * FROM `nonteachingstaff` WHERE `school_id`=?";
  db.query(sql,school_id,(err,data)=>{
   if(err){
    res.send(err);
   }else{
    res.send(data);
   }
  })
}
const nonteacher_get_id=(req,res)=>{
  const {school_id,id}=req.params;
  const sql="SELECT * FROM `nonteachingstaff` WHERE `school_id`=? AND id=?";
  db.query(sql,[school_id,id],(err,data)=>{
   if(err){
    res.send(err);
   }else{
    res.send(data);
   }
  })
}
const class_section = (req, res) => {
  const class_name = req.body.class_name;
  const user_token = req.body.user_token;
  const class_section = req.body.section_name;

  const sql =
    "INSERT INTO `class_sections`(`user_token`, `class`, `section`) VALUES (?,?,?)";
  db.query(
    sql,
    [user_token, class_name, class_section],
    (err, data) => {
      if (err) {
        return err;
      } else {
        return res.json(data);
      }
    }
  );
}
const class_section_get = (req, res) => {
  const sql = "SELECT * FROM `class_sections`";
  db.query(sql, (err, data) => {
    if (err) {
      res.send(err)
    } else {
      res.send(data);
    }
  })
}
const class_section_get_id = (req, res) => {
  const token = req.params.id;
  const query = "SELECT * FROM `class_sections` WHERE user_token=?";
  db.query(query, token, (err, data) => {
    if (err) {
      res.status(500).json({ err: 'Internal Server Error' });
    } else {
      res.json(data);
    }
  })
}
const class_section_get_class = (req, res) => {
  const { classes, user_id } = req.params;
  console.log(classes);
  console.log(user_id);
  const query = "SELECT * FROM `class_sections` WHERE class=? AND user_token=?";
  db.query(query, [classes, user_id], (err, data) => {
    if (err) {
      res.status(500).json({ err: 'Internal Server Error' });
    } else {
      res.json(data);
    }
  })
}
const getstudentdatabyadmin = (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM `studentdata` WHERE admin_token=?"
  db.query(sql, id, (err, data) => {
    if (err) {
      return err;
    } else {
      res.send(data);
    }
  })
}

const getteacherdatabyadmin = (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM `teachersdata` WHERE school_id=?"
  db.query(sql, id, (err, data) => {
    if (err) {
      return err;
    } else {
      res.send(data);
    }
  })
}
const getteacherdatabyadmin_by_gender = (req, res) => {
   const {school_id,gender}=req.params;
  const sql = "SELECT * FROM `teachersdata` WHERE admin_token=? AND gender=?"
  db.query(sql, [school_id,gender], (err, data) => {
    if (err) {
      return err;
    } else {
      res.send(data);
    }
  })
}
const getteacherdatabyid = (req, res) => {
  const { admin_id, id } = req.params;
  const sql = "SELECT * FROM `teachersdata` WHERE id=? AND school_id=?"
  db.query(sql, [id, admin_id], (err, data) => {
    if (err) {
      return err;
    } else {
      res.send(data);
    }
  })
}
const getteacherdatabyteacher_id=(req,res)=>{
  const {teacher_id,admin_id}=req.params;
  const sql = "SELECT * FROM `teachersdata` WHERE teacher_id=? AND admin_token=?"
  db.query(sql, [teacher_id, admin_id], (err, data) => {
    if (err) {
      return err;
    } else {
      res.send(data);
    }
  })
}
const studentdetailbyid = (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM `studentdata` WHERE student_code=?";
  db.query(sql, id, (err, data) => {
    if (err) {
      return err;
    } else {
      res.send(data);
    }
  })
}
const schooltimetable_post = (req, res) => {
  console.log(req.body);
  const admin_id = req.body.admin_id;
  const classes = req.body.class;
  const startday = req.body.startday;
  const endday = req.body.endday;
  const teachername = req.body.teacher_name;
  const subject = req.body.subject;
  const section = req.body.section;
  const startinghour = req.body.starthour;
  const startingminutes = req.body.startminutes;
  const endhour = req.body.endhour;
  const endminutes = req.body.endminutes;
  const startampm = req.body.startampm;
  const endampm = req.body.endampm;
  const teacher_id=req.body.teacher_id
  const sqldata = [
    admin_id,
    classes,
    startday,
    startinghour + ":" + startingminutes + " " + startampm,
    endhour + ":" + endminutes + " " + endampm,
    endday,
    teachername,
    subject,
    section,
    teacher_id,
  ]
  const sql = "INSERT INTO `schooltimetable`(`admin_id`, `class`, `startday`, `startingtime`, `endingtime`, `endday`, `assign_teacher`, `subject`, `section`,`teacher_id`) VALUES (?,?,?,?,?,?,?,?,?,?)"
  db.query(sql, sqldata, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  })
}
const schooltimetable_get = (req, res) => {
  const sql = "SELECT * FROM `schooltimetable`";
  db.query(sql, (err, data) => {
    if (err) {
      res.send(err)
    } else {
      res.send(data);
    }
  })
}
const schooltimetable_get_by_id = (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM `schooltimetable` WHERE admin_id=?";
  db.query(sql, id, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  })
}
const schooltimetable_get_teacher=(req,res)=>{
  const {teacher_id,admin_id} = req.params;
  const sql = "SELECT * FROM `schooltimetable` WHERE teacher_id=? AND admin_id=?";
  db.query(sql, [teacher_id,admin_id], (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  })
}
const schoolsubject_post = (req, res) => {
  const sqldata = [
    req.body.subject,
    req.body.admin_id,
    req.body.class,
    req.body.stream||'',
  ]
  const sql = "INSERT INTO `schoolsubject`(`subject`, `admin_id`, `class`,`stream`) VALUES (?,?,?,?)";
  db.query(sql, sqldata, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  })
}
const schoolsubject_get = (req, res) => {
  const sql = "SELECT * FROM `schoolsubject`";
  db.query(sql, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  })
}


const schoolsubject_get_id = (req, res) => {
  const { classes, id } = req.params;
  const sql = "SELECT * FROM `schoolsubject` WHERE class=? AND admin_id=?";
  db.query(sql, [classes, id], (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  })
}
const schoolsubject_get_id_class = (req, res) => {
  const {classes} = req.params;
  const sql = "SELECT * FROM `schoolsubject` WHERE class=?";
  db.query(sql, [classes], (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  })
}
const schoolsubject_delete = (req, res) => {
  const { key } = req.params;
  const sql = "DELETE FROM `schoolsubject` WHERE id=?"
  db.query(sql, key, (err, data) => {
    if (err) {
      return res.send(err);
    } else {
      return res.send(data);
    }
  })
}
const schoolholiday_post = (req, res) => {
  const sqldata = [
    req.body.user_token,

    req.body.holiday_name,
    req.body.startdate,
    req.body.enddate
  ]
  const sql = "INSERT INTO `schoolholiday`(`user_id`, `holiday_name`, `startdate`, `enddate`) VALUES (?,?,?,?)";
  db.query(sql, sqldata, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  })
}
const schoolholiday_get = (req, res) => {
  const sql = "SELECT * FROM `schoolholiday`";
  db.query(sql, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  })
}
const schoolholiday_get_user_id = (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM `schoolholiday` WHERE user_id=?";
  db.query(sql, id, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  })
}
const schoolholiday_delete = (req, res) => {
  const id = req.params.id;

  const sql = "DELETE FROM `schoolholiday` WHERE id=?";
  db.query(sql, id, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  })
}
const schoolcalenders = (req, res) => {
  const sqldata = [
    req.body.school_id,
    req.body.start,
    req.body.end,
    req.body.title
  ];
    
  const sql="INSERT INTO `schoolcalender`(`school_id`, `start`, `end`, `title`) VALUES (?,?,?,?)"
  db.query(sql,sqldata,(err,data)=>{
    if(err){
      res.send(err);
    }else{
      res.send(data);
    }
  })

}
const schoolcalender_get=(req,res)=>{
  const sql="SELECT * FROM `schoolcalender`";
  db.query(sql,(err,data)=>{
    if(err){
   res.send(err);
    }else{
      res.send(data);
}
  })
}
const schoolcalender_get_id=(req,res)=>{
  const id=req.params.id;
  const sql="SELECT  `id`, `start`, `end`, `title` FROM `schoolcalender` WHERE school_id=?";
  db.query(sql,id,(err,data)=>{
    if(err){
      res.send(err);
    }else{
      res.send(data);
    }
  })
}
const schooltimetable_get_class_section=(req,res)=>{
  const {classes,section,school_id}=req.params;
  const sql="SELECT * FROM `schooltimetable` WHERE class=? AND section=? AND admin_id=?"
   db.query(sql,[classes,section,school_id],(err,data)=>{
    if(err){
      res.send(err);
    }else{
      res.send(data);

    }
   })
}
const managestudentfee_post=(req,res)=>{
  const sqldata=[
    req.body.month,
    req.body.amount,
    req.body.fee_status,
    req.body.year,
    req.body.date,
    req.body.student_id,
    req.body.class,
    req.body.section,
    req.body.student_name,
    req.body.school_id,
    req.body.remain_balance
  ]
  const sql="INSERT INTO `manage_student_fee`(`month`, `amount`, `status`, `year`, `date`, `student_id`, `class`, `section`, `student_name`,`school_id`,`remain_balance`) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
   db.query(sql,sqldata,(err,data)=>{
  if(err){
    res.send(err);
  }else{
    res.send(data);
  }
})
}
const managestudentfee_get_by_school_id=(req,res)=>{
  const school_id=req.params.school_id;
  const student_id=req.params.student_id;
   const sql="SELECT * FROM `manage_student_fee` WHERE school_id=? AND student_id=?";
    db.query(sql,[school_id,student_id],(err,data)=>{
      if(err){
        res.send(err);
      }else{
        res.send(data);
      }
    })
}
const managestudentfee_get_by_school_id_class=(req,res)=>{
  const school_id=req.params.school_id;
  const classes=req.params.classes;
   const sql="SELECT * FROM `manage_student_fee` WHERE school_id=? AND class=?";
    db.query(sql,[school_id,classes],(err,data)=>{
      if(err){
        res.send(err);
      }else{
        res.send(data);
      }
    })
}
const managestudentfee_get_by_school_id_student_id=(req,res)=>{
  const {student_id,school_id,month,year}=req.params;
   const sql="SELECT * FROM `manage_student_fee` WHERE school_id=? AND student_id=? AND month=? AND year=?";
    db.query(sql,[school_id,student_id,month,year],(err,data)=>{
      if(err){
        res.send(err);
      }else{
        res.send(data);
      }
    })
}
const school_announcement_post=(req,res)=>{
  const sqldata=[
    req.body.heading,
    req.body.notice,
    req.body.date,
    req.body.school_id
  ]
  const sql="INSERT INTO `new_announcement`(`heading`, `notice`, `date`, `school_id`) VALUES (?,?,?,?)";
  db.query(sql,sqldata,(err,data)=>{
    if(err){
        res.send(err);
    }else{
      res.send(data);
    }
  })
}
const school_announcement_get=(req,res)=>{
  const id=req.params.school_id;
  const sql="SELECT * FROM `new_announcement` WHERE school_id=?";
  db.query(sql,id,(err,data)=>{
    if(err){
      res.send(err);
    }else{
      res.send(data);
    }
  })
}
const school_announcement_delete=(req,res)=>{
  const id=req.params.id;
  const sql="DELETE FROM `new_announcement` WHERE id=?";
  db.query(sql,id,(err,data)=>{
    if(err){
      res.send(err);
    }else{
      res.send(data);
    }
  })
}
const school_announcement_update=(req,res)=>{
  const id=req.params.id;
  const sqldata=[
    req.body.heading,
    req.body.notice,
    req.body.date,
    req.body.school_id,
    id,
  ]
  const sql="UPDATE `new_announcement` SET `heading`=?,`notice`=?,`date`=?,`school_id`=? WHERE id=?"
  db.query(sql,sqldata,(err,data)=>{
    if(err){
      res.send(err);
    }else{
      res.send(data);
    }
  })
}
const  school_announcement_id=(req,res)=>{
   const {school_id,id}=req.params;
   const sql="SELECT * FROM `new_announcement` WHERE school_id=? AND id=?";
   db.query(sql,[school_id,id],(err,data)=>{
    if(err){
      res.send(err);
    }else{
      res.send(data)
    }
   })
}
 const school_section_dublicate=(req,res)=>{
 const {section,classes,school_id}=req.params;
 const sql="SELECT * FROM `class_sections` WHERE section=? AND user_token=? AND class=?";
 db.query(sql,[section,school_id,classes],(err,data)=>{
     if(err){
      res.send(err);
     }else{
      res.send(data);
     }
 }
 )}

 const section_delete=(req,res)=>{
  const {id}=req.params;
  const sql="DELETE FROM `class_sections` WHERE id=?";
  db.query(sql,id,(err,data)=>{
     if(err){
      res.send(err);
     }else{
      res.send(data);
     }
  })
 }
 const school_subject_dublicate=(req,res)=>{
  const {subject,school_id,classes}=req.params;
  const sql="SELECT * FROM `schoolsubject` WHERE subject=? AND admin_id=? AND class=?";
  db.query(sql,[subject,school_id,classes],(err,data)=>{
      if(err){
       res.send(err);
      }else{
       res.send(data);
      }
  }
  )}


module.exports = {
  admindata_get_email,
  school_subject_dublicate,
  admindata_post,
  section_delete,
  studenthouse_scan_dublicate,
  school_section_dublicate,
  school_announcement_id,
  school_announcement_update,
  school_announcement_delete,
  schoolsubject_get_id_class,
  school_announcement_get,
  school_announcement_post,
  nonteacher_post,
  managestudentfee_get_by_school_id_class,
  getstudent_data_by_gender,
  managestudentfee_get_by_school_id_student_id,
  managestudentfee_get_by_school_id,
  managestudentfee_post,
  getstudent_data_by_class_section,
  schooltimetable_get_class_section,
  schoolcalender_get_id,
  schoolcalender_get,
  schoolcalenders,
  schoolholiday_delete,
  schoolholiday_get_user_id,
  schoolholiday_get,
  nonteacher_get,
  schoolholiday_post,
  schoolsubject_delete,
  nonteacher_get_id,
  schoolsubject_get_id,
  getteacherdatabyteacher_id,
  getteacherdatabyid,
  schoolsubject_get,
  schoolsubject_post,
  schooltimetable_get_by_id,
  schooltimetable_get,
  schooltimetable_post,
  studentdetailbyid,
  signup,
  getteacherdatabyadmin,
  getstudentdatabyadmin,
  class_section_get_class,
  class_section_get_id,
  class_section_get,
  poststudentdata_excel,
  signupemail,
  class_section,
  getstudent_data_by_class,
  signuppost,
  apisignupid,
  schooltimetable_get_teacher,
  register_address_post,
  register_address_get_id,
  register_address_get,
  admindata_get_id,
  defaultapi,
  postteacher_data,
  admindata_get,
  classes_get,
  classes_post,
  classes_get_id,
  classes_get_search,
  classes_get_all_search,
  class_delete,
  class_limit,
  studenthouse_get,
  getstudent_data,
  studenthouse_post,
  getteacherdatabyadmin_by_gender,
  studenthouse_get_id,
  studenthouse_delete,
  Student_post,
  getstudent_data_admission_no
};

