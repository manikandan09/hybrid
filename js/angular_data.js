var app = angular.module("myapp", ['ngCookies']);
app.controller("myappCtrl", function($scope, $cookies, $cookieStore, $http) 
{
	
		
	
	
	/****************************************************************************/
/************************** User Login *************************************/
/****************************************************************************/
	// sign in button
	$scope.login = function() 
	{		
        $http.post('http://ieee.pythonprojects.org/login.php', 
			{'email': $scope.email, 'password':$scope.password})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				alert("Login Successful");
				$cookieStore.put("cook_user_email",data.email);
				window.location = "home.html";  // Home Page
				return;				
			}
			else if(data.success == 2)
			{
				alert("Please Fill All Fields");
			}
			else
			{
				alert("Login Unsuccessful");
			}
        });
    }
	
	
/************************** Cookies **********************************/	
	$scope.cook_user_email = $cookieStore.get("cook_user_email");
	
	//************************** register **********************************/	

	$scope.register = function() 
	{		
		$http.post('http://ieee.pythonprojects.org/register.php',{
		 'name':$scope.name,'mobile': $scope.mobile,'email':$scope.email,'password':$scope.password})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				alert("Un Successfully");
					
			}
			else
			{
				alert("Registered successfully");
				window.location = "login.html";
				return;	
				
			}   
          });
     }
/****************************************************************************/
/************************** logout ***********************************/
/****************************************************************************/	

			
	$scope.logout = function() 
	{
		if(confirm("Are You Sure?"))
		{
			$cookies.cook_user_email = "";
			window.location = "index.html";
			return;
		}
		else
		{
			return false;
		}
	}

/****************************************************************************/
/************************** Get My Files ***********************************/
/****************************************************************************/

	$http.post('http://ieee.pythonprojects.org/get_files.php', {'email': $scope.cook_user_email})
	.success(function(data, status, headers, config) 
	{
		if(data.success == 1)
		{
			$scope.alldetails = data.details;
		}
		else
		{
			$scope.alldetails = "No Data Found !!!";
		}
    });
	
/****************************************************************************/
/************************** Delete ***********************************/
/****************************************************************************/
	
		$scope.file_delete = function(cus_id) 
	{		
        $http.post('http://ieee.pythonprojects.org/file_delete.php', 
		{
		'cus_id': cus_id
		})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				alert("Deleted Successful");
				window.location = "view_files.html";	
				return;
			}
			else if(data.success == 0)
			{
				alert("Error While Deleting Product!!");
			}
			else
			{
				alert("No id found");
			}
        });
    }


	
/****************************************************************************/
/************************** File Download ***********************************/
/****************************************************************************/	
			$scope.file_download = function(cus_id) 
			{
				$cookieStore.put("cook_cus_id",cus_id);
				window.location = "download.html";
				return;
			}
		$scope.cook_cus_id = $cookieStore.get("cook_cus_id");
		
		$scope.myhide = true;
		
		$scope.verify_token = function() 
		{				
			$http.post('http://ieee.pythonprojects.org/verify_token.php', {
				'id': $scope.cook_cus_id,'token': $scope.token })
			.success(function(data, status, headers, config) 
			{
				if(data.success == 1)
				{
					$scope.myhide = false;
					$scope.download_details = data.details;
				}
				else
				{
					$scope.download_details = "No Address Found !!!";
				}
			});
		}

//, {'email': $scope.cook_user_email}
	$http.post('http://ieee.pythonprojects.org/get_files.php')
	.success(function(data, status, headers, config) 
	{
		if(data.success == 1)
		{
			$scope.alldetails = data.details;
		}
		else
		{
			$scope.alldetails = "No Data Found !!!";
		}
    });
	
});