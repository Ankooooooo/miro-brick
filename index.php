<?
  include "title.php";
  include "admin/lib/dbconn.php";
  include "admin/lib/popupconf.php";
  include "admin/lib/lib.php";
?>
<!--탑 부분-->
<? include "topmenu.php"; ?>
<!--탑 부분끝-->

<?  if($popchk && $popchk==1){ 
		if (!$popwidth && !$popheight) { $popwidth=300; $popheight=300; } 

		include_once "./popup/popup-2.php"; // 레이어팝업창
} 
?>
	
	<div id="container">
		<div id="content" class="pts12">
			
            <!-- 메인 대배너 -->
			<div style="width: 100%; margin:0 auto;">
				<div class="sliders1 js-bxslider1">
					<div class="screen">
						<ul class="list">

<? $banner_path="upload_file/main_banner";  // 메인 대배너 경로

   // 메인 슬라이드 배너 
  $query="select * from new_main_banner where use_ok='y' order by rank asc";
  $result_banner=mysql_query($query);

	while ($row_banner=mysql_fetch_array($result_banner)) { 
?>
						<li><a href=# class="box"><img src="<?=$banner_path?>/<?=$row_banner[b1_img]?>" alt="미로브릭"></a></li>
	<? } ?>

						</ul>				
					</div>
				</div>
			</div>
            
            <!-- 신제품 -->
            <div class="agn-cen ptbs50 main_bg02">
					<h2 class="fs28 fws700 mbs30">인기제품 <b class="pls10 fs18"></b></h2>
					
				  <div class="lhs1_5 cls-666666 mts30">
					  
					  <div class="thumb_comm ws1200 mgn-auto">
						<ul class="list_thumb02 agn-cen">

<?  
  $product_path="product/file_data";  // 제품 이미지 경로
  $query="select * from daedo_brick where RECOMM_OK='Y' and USEYN='Y' order by BRICKSEQ desc, brickid desc limit 0, 21";
  $result=mysql_query($query);   
 
   $list_cnt = 0;

   while( $data=mysql_fetch_array($result)) {
		
		if ($data[IMGFILE1]) { $p_img=$data[IMGFILE1];
		} else if ($data[IMGFILE2]) { $p_img=$data[IMGFILE2];
		} else if ($data[IMGFILE3]) { $p_img=$data[IMGFILE3];
		} else if ($data[IMGFILE4]) { $p_img=$data[IMGFILE4];
		} else if ($data[IMGFILE5]) { $p_img=$data[IMGFILE5];
		}

   $list_cnt++;
?>		
							<li>
								<a href="/product_view.php?brick_id=<?=$data[BRICKID]?>&catid=<?=$data[CATEID]?>" class="link_thumb hover01"><figure><img src="<?=$product_path?>/<?=$p_img?>" class="thumb_img" width="155" height="107" alt="<?=$data[BRICKNM]?>" /></figure></a>
								<p class="cont_info">
									<strong class="tit_subject"><a href="/product_view.php?brick_id=<?=$data[BRICKID]?>&catid=<?=$data[CATEID]?>" class="link_tit"><?=$data[BRICKNM]?></a></strong>
								</p>
							</li>
	<? } ?>							

						</ul>
					</div>						
				  </div>					
				</div>
			
	                
                <!-- 갤러리 -->
            <div class="mts45 agn-cen pbs50">
					<h2 class="fs28 fws700 mbs30">시공갤러리 <b class="pls10 fs18"><a href="/board.php?leftmenu_id=2">더보기+</a></b></h2>
					
				  <div class="lhs1_5 cls-666666 mts30">
					  
					  <div class="thumb_comm ws1200 mgn-auto">
                        <ul class="list_thumb02 agn-cen pts25 pbs30">

<?  
		$code="sky_photobbs";
		$imgdest="./upload_file/$code";  /////// 자료, 이미지 저장경로
		
		$query = "select * from $code order by id desc limit 0, 7" ; 
		$result3=mysql_query($query);  

	    $list_cnt = 0;

   while( $data3=mysql_fetch_array($result3)) {
    $list_cnt++;
?>	
							<li>
								<a href='./view.php?id=<?=$data3[id]?>&code=<?=$code?>&leftmenu_id=2' class="link_thumb hover01"><figure><img src='<?=$imgdest?>/<?=$data3[r_user_img]?>' class="thumb_img" width="155" height="107" alt="<?=$data3[title]?>" /></figure></a>
								<p class="cont_info">
									<strong class="tit_subject"><a href="./view.php?id=<?=$data3[id]?>&code=<?=$code?>&leftmenu_id=2" class="link_tit"><?=$data3[title]?></a></strong>
								</p>
							</li>
	<? } ?>
	
						</ul>
					</div>						
				  </div>					
				</div>
                
                <!-- 연락처/입금정보/공지사항 -->
                <div style="border-top:1px solid #fe9e2a; width:100%; height:230px; background-color:#e67d03;">
                	<div class="mgn-auto ws1000">
                        <div class="fls ms3bg03_img" style="width:363px; height:230px;">
                            <ul>
                                <li class="ptbs35 agn-cen fs24 fwb">공지사항 &nbsp;&nbsp;<span class="fs13"> <a href="/newsboard.php?leftmenu_id=3">더보기+</a></span>
                                </li>
                                <li class="pls52 fs14 lhs1_8">
									<ul>
                                   	<!--공지사항 부분-->
										<? include "notice.php"; ?>
										<!--끝-->									
									</ul>
                                </li>
                            </ul>
                        </div>
                        <div class="fls ms3bg02_img agn-cen" style="width:317px; height:230px;">
                            <ul>
                                <li class="ptbs35 fls t-arrs" style="width: 50%;">
									<a href="https://blog.naver.com/miro-brick
" target="_blank"><img src="../../image/icon/blog.png" alt="네이버블로그" class="pts12" /></a>&nbsp;&nbsp;
                                </li>
                                <li class="ptbs35 fls t-ars" style="width: 50%;">&nbsp;&nbsp;&nbsp;
                                   <a href="https://instagram.com/mirobrick" target="_blank"><img src="../../image/icon/instagram.png" alt="인스타그램" class=" pts12" /></a>
                                </li>
                            </ul>
                        </div>
						<div class="fls ms3bg01_img" style="width:317px; height:230px;">
                            <ul>
                                <li class="ptbs35 agn-cen fs24 fwb">고객문의
                                </li>
                                <li class="pls85 fs20 lhs28"><strong>010-2221-0809</strong><br>
									<strong>02-903-8181</strong>
                                </li>
                            </ul>
                        </div>                        
                        
                    </div>
                </div>
			
		</div>
	</div>
	
<!--푸터 부분-->
<? include "footer.php"; ?>
<!--푸터 부분끝-->		
	
<script>
/* bxslider plugin call  */
$(".js-bxslider1 .list").bxSlider({
	mode:'fade',
	auto : true,
	speed : 1200,
	autoHover : true
});		
</script>
