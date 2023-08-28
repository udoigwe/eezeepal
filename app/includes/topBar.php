<!-- Topbar Start -->
<div class="navbar-custom">
	<ul class="list-unstyled topnav-menu float-right mb-0">

		<li class="dropdown notification-list">
			<a class="nav-link dropdown-toggle nav-user mr-0 waves-effect waves-light" data-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
				<img alt="user-avatar" class="rounded-circle user-avatar-small">
				<span class="pro-user-name ml-1">
					<span id="user_full_name"></span> <i class="mdi mdi-chevron-down"></i> 
				</span>
			</a>
			<div class="dropdown-menu dropdown-menu-right profile-dropdown ">
				<!-- item-->
				<a href="account" class="dropdown-item notify-item">
					<i class="mdi mdi-account-card-details"></i>
					<span>My Account</span>
				</a>
				<!-- item-->
				<a href="javascript:void(0);" class="dropdown-item notify-item" onclick="showSignOutMessage();">
					<i class="mdi mdi-logout"></i>
					<span>Logout</span>
				</a>

			</div>
		</li>


		<!-- <li class="dropdown notification-list">
			<a href="javascript:void(0);" class="nav-link right-bar-toggle waves-effect waves-light">
				<i class="fe-settings noti-icon"></i>
			</a>
		</li> -->


	</ul>

	<!-- LOGO -->
	<div class="logo-box">
		<a href="/" class="logo text-center">
			<span class="logo-lg">
				<img src="../../assets/images/vvplogo.png" alt="vvp logo" width="30%">
			</span>
			<span class="logo-sm">
				<img src="../../assets/images/vvplogo.png" alt="vvp logo" width="80%">
			</span>
		</a>
	</div>

	<ul class="list-unstyled topnav-menu topnav-menu-left m-0">
        <li>
            <button class="button-menu-mobile waves-effect waves-light">
                <i class="fe-menu"></i>
            </button>
        </li>
    </ul>
</div>
<!-- end Topbar -->