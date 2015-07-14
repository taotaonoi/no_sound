
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();

function user(inthn,gender,age,group){
	var db = openDatabase('hospital', '1.0', 'hospitaldb', 2 * 1024 * 1024);
	
	db.transaction(function(tx) {
		tx.executeSql('CREATE TABLE IF NOT EXISTS user (hn string primary key, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP, gender string, age integer, gp string, eva integer)');

		tx.executeSql("INSERT INTO user (hn,gender,age,gp,eva) VALUES (?,?,?,?,?)", [inthn,gender,age,group,0], function(tx, res) {
		  console.log("insertId: " + res.insertId + " -- probably 1");
		  console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");

		}, function(e) {
		  console.log("ERROR: " + e.message);
		});
	 });
}

var status = 0;

function updateStatus(inthn,s,group){
	var db = openDatabase('hospital', '1.0', 'hospitaldb', 2 * 1024 * 1024);
	
	status = s;	
	//alert(status);
	if(status == 0){
		db.transaction(function(tx) {
			tx.executeSql('CREATE TABLE IF NOT EXISTS groupA (id integer primary key, hn string, rate1 integer, rate2 integer, ratepar1 integer, ratepar2 integer, mypas integer, status integer)');
			
				//alert(inthn + " " +status);
				tx.executeSql("INSERT INTO groupA (hn,status) VALUES (?,?)", [inthn,status], function(tx, res) {
					//alert("2update");
				  console.log("insertId: " + res.insertId + " -- probably 1");
				  console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");

				}, function(e) {
				  console.log("ERROR: " + e.message);
				});
			
				
		 });
	}
	else if(status == 11 && group == "B"){
		db.transaction(function(tx) {
			tx.executeSql('CREATE TABLE IF NOT EXISTS groupB (id integer primary key, hn string, rate1 integer, rate2 integer, mypas integer, status integer)');
			
				tx.executeSql("INSERT INTO groupB (hn,status) VALUES (?,?)", [inthn,status], function(tx, res) {
				
				  console.log("insertId: " + res.insertId + " -- probably 1");
				  console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");

				}, function(e) {
				  console.log("ERROR: " + e.message);
				});
			
			
		 });
	}
	else{
		db.transaction(function(tx) {
			tx.executeSql('UPDATE groupA SET status = ? WHERE hn = ? AND status != 99', [status,inthn], function(tx, res) {
			
			}, function(e) {
			  console.log("ERROR: " + e.message);
			});
		 });
	}
}

function setStatus(s){
	status = s;
}

function updateStatus2(inthn,group){
	var db = openDatabase('hospital', '1.0', 'hospitaldb', 2 * 1024 * 1024);
	
	//alert(status + "2");
	if(status == 0){
		db.transaction(function(tx) {
			tx.executeSql('CREATE TABLE IF NOT EXISTS groupA (id integer primary key, hn string, rate1 integer, rate2 integer, ratepar1 integer, ratepar2 integer, mypas integer, status integer)');
			
				//alert(status);
				tx.executeSql("INSERT INTO groupA (hn,status) VALUES (?,?)", [inthn,status], function(tx, res) {
					//alert("2update");
				  console.log("insertId: " + res.insertId + " -- probably 1");
				  console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");

				}, function(e) {
				  console.log("ERROR: " + e.message);
				});
			
				
		 });
	}
	else if(group == "B" && status == 11){
		db.transaction(function(tx) {
			tx.executeSql('CREATE TABLE IF NOT EXISTS groupB (id integer primary key, hn string, rate1 integer, rate2 integer, mypas integer, status integer)');
			
				//alert(status);
				tx.executeSql("INSERT INTO groupB (hn,status) VALUES (?,?)", [inthn,status], function(tx, res) {
					//alert("2update");
				  console.log("insertId: " + res.insertId + " -- probably 1");
				  console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");

				}, function(e) {
				  console.log("ERROR: " + e.message);
				});
			
				
		 });
	}
	else {
		db.transaction(function(tx) {
			tx.executeSql('UPDATE groupA SET status = ? WHERE hn = ? AND status != 99', [status,inthn], function(tx, res) {
			
			}, function(e) {
			  console.log("ERROR: " + e.message);
			});
		 });
	}
	
}

function getStatus(inthn,group){
	var db = openDatabase('hospital', '1.0', 'hospitaldb', 2 * 1024 * 1024);
	
	status = 0;
	//alert(group);
	if(group === "A"){
		//alert(inthn);
		db.transaction(function(tx) {
			//alert("aa");
			//tx.executeSql('CREATE TABLE IF NOT EXISTS groupA (id integer primary key, hn string, rate1 integer, rate2 integer, ratepar1 integer, ratepar2 integer, status integer)');
	
			tx.executeSql('SELECT status FROM groupA WHERE hn = ?',[inthn], function(tx, res) {
				  //alert("2get: "+res.rows.length);
				   $.each(res.rows,function(index){
						var row = res.rows.item(index);
						status = row['status'];
					});	

			}, function(e) {
				console.log("ERROR: " + e.message);
			});
		 });
	}
	else{
		status = 11;
		db.transaction(function(tx) {
			//tx.executeSql('CREATE TABLE IF NOT EXISTS groupB (id integer primary key, hn string, rate1 integer, rate2 integer, mypas integer, status integer)');
			
			tx.executeSql('SELECT status FROM groupB WHERE hn = ? ',[inthn], function(tx, res) {
				
				  $.each(res.rows,function(index){
						var row = res.rows.item(index);
						status = row['status'];
					});	

				}, function(e) {
				  console.log("ERROR: " + e.message);
			});
		});
	}
	
	return status;
}

function groupA1(inthn,rate1){
	var db = openDatabase('hospital', '1.0', 'hospitaldb', 2 * 1024 * 1024);
	
	db.transaction(function(tx) {
		tx.executeSql('UPDATE groupA SET rate1 = ? WHERE hn = ? AND status != 99', [rate1,inthn], function(tx, res) {
			

		}, function(e) {
		  console.log("ERROR: " + e.message);
		});
	 });
}

function groupA2(inthn,rate2){
	var db = openDatabase('hospital', '1.0', 'hospitaldb', 2 * 1024 * 1024);
	
	db.transaction(function(tx) {

		tx.executeSql('UPDATE groupA SET rate2 = ? WHERE hn = ? AND status != 99', [rate2,inthn], function(tx, res) {
			

		}, function(e) {
		  console.log("ERROR: " + e.message);
		});
	 });
}

function groupB1(inthn,rate1){
	var db = openDatabase('hospital', '1.0', 'hospitaldb', 2 * 1024 * 1024);
	
	db.transaction(function(tx) {
		tx.executeSql('UPDATE groupB SET rate1 = ? WHERE hn = ? AND status != 99', [rate1,inthn], function(tx, res) {
			

		}, function(e) {
		  console.log("ERROR: " + e.message);
		});
	 });
}

function groupB2(inthn,rate2){
	var db = openDatabase('hospital', '1.0', 'hospitaldb', 2 * 1024 * 1024);
	
	db.transaction(function(tx) {

		tx.executeSql('UPDATE groupB SET rate2 = ? WHERE hn = ? AND status != 99', [rate2,inthn], function(tx, res) {
			

		}, function(e) {
		  console.log("ERROR: " + e.message);
		});
	 });
}

function groupA3(inthn,ratepar1){
	var db = openDatabase('hospital', '1.0', 'hospitaldb', 2 * 1024 * 1024);
	
	db.transaction(function(tx) {
		//tx.executeSql('CREATE TABLE IF NOT EXISTS groupA (id integer primary key, hn string, rate1 integer, rate2 integer, ratepar1 integer, ratepar2 integer)');
	
		tx.executeSql('UPDATE groupA SET ratepar1 = ? WHERE hn = ? AND status != 99', [ratepar1,inthn], function(tx, res) {
			

		}, function(e) {
		  console.log("ERROR: " + e.message);
		});
	 });
}

function groupA4(inthn,ratepar2){
	var db = openDatabase('hospital', '1.0', 'hospitaldb', 2 * 1024 * 1024);
	
	db.transaction(function(tx) {
		tx.executeSql('UPDATE groupA SET ratepar2 = ? WHERE hn = ? AND status != 99', [ratepar2,inthn], function(tx, res) {
			

		}, function(e) {
		  console.log("ERROR: " + e.message);
		});
	 });
}

function doctor(username, password){
	var db = openDatabase('hospital', '1.0', 'hospitaldb', 2 * 1024 * 1024);

	db.transaction(function(tx) {
		tx.executeSql('CREATE TABLE "doctor" ("username" TEXT, "password" TEXT)');

		tx.executeSql("INSERT INTO doctor (username,password) VALUES (?,?)", [username,password], function(tx, res) {
		  console.log("insertId: " + res.insertId + " -- probably 1");
		  console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");

		}, function(e) {
		  console.log("ERROR: " + e.message);
		});
	
	 });
}

function rate(score,hn){
	var db = openDatabase('hospital', '1.0', 'hospitaldb', 2 * 1024 * 1024);

	db.transaction(function(tx) {
		tx.executeSql('CREATE TABLE IF NOT EXISTS rate (id integer primary key, hn string, rating integer)');

		tx.executeSql("INSERT INTO rate (hn, rating) VALUES (?,?)", [hn,score], function(tx, res) {

		}, function(e) {
		  console.log("ERROR: " + e.message);
		});
		
	 });
}

function rate2(score,hn){
	var db = openDatabase('hospital', '1.0', 'hospitaldb', 2 * 1024 * 1024);

	db.transaction(function(tx) {
		tx.executeSql('CREATE TABLE IF NOT EXISTS rateparent (id integer primary key,  hn string, rating integer)');

		tx.executeSql("INSERT INTO rateparent (hn,rating) VALUES (?,?)", [hn,score], function(tx, res) {
		  console.log("insertId: " + res.insertId + " -- probably 1");
		  console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");

		}, function(e) {
		  console.log("ERROR: " + e.message);
		});
		
	 });
}

function rate3(score1,score2,score3,score4,score5,hn,username){
	var db = openDatabase('hospital', '1.0', 'hospitaldb', 2 * 1024 * 1024);

	db.transaction(function(tx) {
		tx.executeSql('CREATE TABLE IF NOT EXISTS mypas (id integer primary key, username TEXT, hn TEXT, score1 integer, score2 integer, score3 integer, score4 integer, score5 integer)');

		tx.executeSql("INSERT INTO mypas (username,hn,score1,score2,score3,score4,score5) VALUES (?,?,?,?,?,?,?)", [username,hn,score1,score2,score3,score4,score5], function(tx, res) {
		  console.log("insertId: " + res.insertId + " -- probably 1");
		  console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");

		}, function(e) {
		  console.log("ERROR: " + e.message);
		});
		
		tx.executeSql('UPDATE user SET eva = 1 Where hn = ?', [hn], function(tx, res) {
		  console.log("SUSCESS: ");

		}, function(e) {
		  console.log("ERROR: " + e.message);
		});
	 });
	
}

function mypas(score1,score2,score3,score4,score5,choosehn,group){
	var db = openDatabase('hospital', '1.0', 'hospitaldb', 2 * 1024 * 1024);
	var score = ((score1/4) + (score2/6) + (score3/4) + (score4/4) + (score5/4))/5*100;
	db.transaction(function(tx) {
		
		if(group == "A"){
			tx.executeSql('UPDATE groupA SET mypas = ? WHERE hn = ? AND status != 99', [score,choosehn], function(tx, res) {
				

			}, function(e) {
			  console.log("ERROR: " + e.message);
			});
		}
		else{
			//alert("bobo");
			tx.executeSql('UPDATE groupB SET mypas = ? WHERE hn = ? AND status != 99' , [score,choosehn], function(tx, res) {
				

			}, function(e) {
			  console.log("ERROR: " + e.message);
			});
		}
	});
}

function selectall(){
	var db = openDatabase('hospital', '1.0', 'hospitaldb', 2 * 1024 * 1024);
	$('#pagegroupa table').empty();
	$('#pagegroupa table').append('<tr><td>HN</td><td>VASผู้ป่วย(ก่อน)</td><td>VASผู้ป่วย(หลัง)</td><td>VASผู้ปกครอง(ก่อน)</td><td>VASผู้ปกครอง(หลัง)</td><td>mYPAS</td></tr>');
	$('#pagegroupb table').empty();
	$('#pagegroupb table').append('<tr><td>HN</td><td>VASผู้ป่วย</td><td>VASผู้ปกครอง</td><td>mYPAS</td></tr>');
	
	db.transaction(function(tx) {	
		tx.executeSql('SELECT COUNT(DISTINCT hn) AS hn from groupA WHERE status != 99',[], function(tx, res) {
			  $.each(res.rows,function(index){
				var row = res.rows.item(index);
				$('.countA').text(row['hn']);
			});
			
		}, function(e) {
		  console.log("ERROR: " + e.message);
		});
		
	
		tx.executeSql('SELECT DISTINCT hn,ifnull(rate1,"-") AS rate1, ifnull(rate2,"-") AS rate2, ifnull(ratepar1,"-") AS ratepar1, ifnull(ratepar2,"-") AS ratepar2, ifnull(mypas,"-") AS mypas FROM groupA WHERE status != 99',[], function(tx, res) {
			  $.each(res.rows,function(index){
				var row = res.rows.item(index);
				$('#pagegroupa table').append('<tr><td>'+row['hn']+'</td><td>'+row['rate1']+'</td><td>'+row['rate2']+'</td><td>'+row['ratepar1']+'</td><td>'+row['ratepar2']+'</td><td>'+row['mypas']+'</td></tr>');
			});
			
		}, function(e) {
		  console.log("ERROR: " + e.message);
		});
		
		
		tx.executeSql('SELECT DISTINCT ifnull(MAX(rate1),"-") AS rate1, ifnull(MAX(rate2),"-") AS rate2, ifnull(MAX(ratepar1),"-") AS ratepar1, ifnull(MAX(ratepar2),"-") AS ratepar2, ifnull(MAX(mypas),"-") AS mypas FROM groupA WHERE status != 99',[], function(tx, res) {
			  $.each(res.rows,function(index){
				var row = res.rows.item(index);
				$('#pagegroupa table').append('<tr><td>'+'MAX'+'</td><td>'+row['rate1']+'</td><td>'+row['rate2']+'</td><td>'+row['ratepar1']+'</td><td>'+row['ratepar2']+'</td><td>'+row['mypas']+'</td></tr>');
			});
			
		}, function(e) {
		  console.log("ERROR: " + e.message);
		});
		
		tx.executeSql('SELECT DISTINCT ifnull(MIN(rate1),"-") AS rate1, ifnull(MIN(rate2),"-") AS rate2, ifnull(MIN(ratepar1),"-") AS ratepar1, ifnull(MIN(ratepar2),"-") AS ratepar2, ifnull(MIN(mypas),"-") AS mypas FROM groupA WHERE status != 99',[], function(tx, res) {
			  $.each(res.rows,function(index){
				var row = res.rows.item(index);
				$('#pagegroupa table').append('<tr><td>'+'MIN'+'</td><td>'+row['rate1']+'</td><td>'+row['rate2']+'</td><td>'+row['ratepar1']+'</td><td>'+row['ratepar2']+'</td><td>'+row['mypas']+'</td></tr>');
			});
			
		}, function(e) {
		  console.log("ERROR: " + e.message);
		});
		
		tx.executeSql('SELECT DISTINCT ifnull(AVG(rate1),"-") AS rate1, ifnull(AVG(rate2),"-") AS rate2, ifnull(AVG(ratepar1),"-") AS ratepar1, ifnull(AVG(ratepar2),"-") AS ratepar2, ifnull(AVG(mypas),"-") AS mypas  FROM groupA WHERE status != 99',[], function(tx, res) {
			  $.each(res.rows,function(index){
				var row = res.rows.item(index);
				$('#pagegroupa table').append('<tr><td>'+'AVG'+'</td><td>'+row['rate1']+'</td><td>'+row['rate2']+'</td><td>'+row['ratepar1']+'</td><td>'+row['ratepar2']+'</td><td>'+row['mypas']+'</td></tr>');
			});
			
		}, function(e) {
		  console.log("ERROR: " + e.message);
		});
		
		// B
		
		tx.executeSql('SELECT COUNT(DISTINCT hn) AS hn from groupB WHERE status != 99',[], function(tx, res) {
			  $.each(res.rows,function(index){
				var row = res.rows.item(index);
				$('.countB').text(row['hn']);
			});
			
		}, function(e) {
		  console.log("ERROR: " + e.message);
		});
		
			tx.executeSql('SELECT DISTINCT hn,ifnull(rate1,"-") AS rate1, ifnull(rate2,"-") AS rate2, ifnull(mypas,"-") AS mypas FROM groupB WHERE status != 99',[], function(tx, res) {
			  $.each(res.rows,function(index){
				var row = res.rows.item(index);
				$('#pagegroupb table').append('<tr><td>'+row['hn']+'</td><td>'+row['rate1']+'</td><td>'+row['rate2']+'</td><td>'+row['mypas']+'</td></tr>');
			});	
			
		}, function(e) {
		  console.log("ERROR: " + e.message);
		});
		
		tx.executeSql('SELECT DISTINCT ifnull(MAX(rate1),"-") AS rate1, ifnull(MAX(rate2),"-") AS rate2, ifnull(MAX(mypas),"-") AS mypas FROM groupB WHERE status != 99',[], function(tx, res) {
			  $.each(res.rows,function(index){
				var row = res.rows.item(index);
				$('#pagegroupb table').append('<tr><td>'+'MAX'+'</td><td>'+row['rate1']+'</td><td>'+row['rate2']+'</td><td>'+row['mypas']+'</td></tr>');
			});
			
		}, function(e) {
		  console.log("ERROR: " + e.message);
		});
		
		tx.executeSql('SELECT DISTINCT ifnull(MIN(rate1),"-") AS rate1, ifnull(MIN(rate2),"-") AS rate2, ifnull(MIN(mypas),"-") AS mypas FROM groupB WHERE status != 99',[], function(tx, res) {
			  $.each(res.rows,function(index){
				var row = res.rows.item(index);
				$('#pagegroupb table').append('<tr><td>'+'MIN'+'</td><td>'+row['rate1']+'</td><td>'+row['rate2']+'</td><td>'+row['mypas']+'</td></tr>');
			});
			
		}, function(e) {
		  console.log("ERROR: " + e.message);
		});
		
		tx.executeSql('SELECT DISTINCT ifnull(AVG(rate1),"-") AS rate1, ifnull(AVG(rate2),"-") AS rate2, ifnull(AVG(mypas),"-") AS mypas FROM groupB WHERE status != 99',[], function(tx, res) {
			  $.each(res.rows,function(index){
				var row = res.rows.item(index);
				$('#pagegroupb table').append('<tr><td>'+'AVG'+'</td><td>'+row['rate1']+'</td><td>'+row['rate2']+'</td><td>'+row['mypas']+'</td></tr>');
			});
			
		}, function(e) {
		  console.log("ERROR: " + e.message);
		});
		
		tx.executeSql('SELECT * FROM mypas WHERE status != 99',[], function(tx, res) {
				
			  $.each(res.rows,function(index){
				var row = res.rows.item(index);
				$('#stat .orange .table4').append('<p>'+"HN: "+row['hn']+" Score1: "+row['score1']+" Score2: "+row['score2']+" Score3: "+row['score3']+" Score4: "+row['score4']+" Score5: "+row['score5']+'</p>');
			});
			
		}, function(e) {
		  console.log("ERROR: " + e.message);
		});
		
	 });
}


function checkuser(user,pass){
	var db = openDatabase('hospital', '1.0', 'hospitaldb', 2 * 1024 * 1024);
	var dbpass;
	db.transaction(function(tx) {
		tx.executeSql('SELECT password FROM doctor WHERE username = "doctor" ',[], function(tx, res) {
		  $.each(res.rows,function(index){
            var row = res.rows.item(index);
			dbpass = row['password'];
        });	

		}, function(e) {
		  console.log("ERROR: " + e.message);
		});

	 });
	 
	if(pass == dbpass ){
		console.log("yes");
		return 1;
	}
	else{
		console.log("no");
		return 0;
	}
	
}	

function checksession(hn){
	var db = openDatabase('hospital', '1.0', 'hospitaldb', 2 * 1024 * 1024);
	
	db.transaction(function(tx) {
		tx.executeSql('SELECT hn FROM user WHERE hn = ? ',[hn], function(tx, res) {
		  $.each(res.rows,function(index){
            var row = res.rows.item(index);
			if(row['hn'] == hn){
				return 1;
			}
		  return 0;
        });	

		}, function(e) {
		  console.log("ERROR: " + e.message);
		});

	 });
	 
}	

function sameuser(inthn){
	var db = openDatabase('hospital', '1.0', 'hospitaldb', 2 * 1024 * 1024);
	
	db.transaction(function(tx) {
		tx.executeSql('SELECT hn FROM user WHERE hn = ?  ',[inthn], function(tx, res) {
		  if(res.rows.length != 0){
			 $('#confirmkid').append('<img src="img/hnpopupbg.png" class="popuppic5" />');
			 document.getElementById('disablingDiv').style.display='block';
			 $('#confirmkid').append('<img src="img/con1.png" class="con" />');
			 $('#confirmkid').append('<img src="img/newhn1.png" class="newhn" />');
			 $('.popuppic2').hide();
			 document.getElementById('disablingDiv').style.display='none';
		  }

		}, function(e) {
		  console.log("ERROR: " + e.message);
		});

	 });
	 
}	

function con(inthn,group){
	return status;
}

function newhn(inthn,group){
	var db = openDatabase('hospital', '1.0', 'hospitaldb', 2 * 1024 * 1024);
	
	db.transaction(function(tx) {

		tx.executeSql('UPDATE groupA SET status = 99 WHERE hn = ?', [inthn], function(tx, res) {
		
		}, function(e) {
			  console.log("ERROR: " + e.message);
		});
		
		tx.executeSql('UPDATE groupB SET status = 99 WHERE hn = ?', [inthn], function(tx, res) {
				
			}, function(e) {
			 console.log("ERROR: " + e.message);
		});
	
		if(group == "A"){
			
			status = 0;
			tx.executeSql("INSERT INTO groupA (hn,status) VALUES (?,?)", [inthn,0], function(tx, res) {
					
				}, function(e) {
				 console.log("ERROR: " + e.message);
				});
		}
		
		else{
			
			status = 11;
			tx.executeSql("INSERT INTO groupB (hn,status) VALUES (?,?)", [inthn,11], function(tx, res) {
				
			}, function(e) {
			 console.log("ERROR: " + e.message);
			});
		}	
		
	 });
}