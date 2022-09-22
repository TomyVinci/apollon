/*
 *  https://tomyvinci.github.io/apollon/
 *
 *  Document   : apollon.js
 *  Author     : Tomy Vinci 
 *  Description: The javascript file of Apollon
 *  Version    : v1.0.0 / Free
 *
*/

if (typeof jQuery != 'undefined') {
	(function($){
	    $.fn.apollon=function(b){
			/*==============
			// Options
			====================*/
	 		var a = $.extend({
				// Table uniq ID
				tableID: 1,
				// Table Name
				tableName: 'Apollon',
				// dist location link from the page
				distloc: '',
				// Get data from / html, js, ajax, jsonf
				datatype: 'html',
				// show like table / list, html
				showmode: 'table',
				showcode: '', 
				// Design
				theme: 1,
				// Get data from AJAX request PHP OR JSON Files
				ajaxload: false,
				// URL of the PHP Files
				data_url: '',
				// Get data from JS arrays
				data: {},
				// Columns to hide for medium width
				hide_md: [],
				// Columns to hide for small width
				hide_sm: [],
				// Functions list
				functions: [],
				// Columns to sort with other columns
				specialsort: [],
				// Columns to show as list
				tolist: [],
				// Columns to use to do filters
				filters: [],
				// Max number of values to show in filter
				filterMaxNum: 20,
				// Columns to show as picture
				toimg: [],
				// Columns to sort as number (numeric sort)
				sortnbr: [],
				// Columns to consider as date mm/dd/yyyy
				datetype: [],
				// the date format d/m or m/d
				dateformat: 'm/d/y',
				// Columns to consider as time hh:ii
				timetype: [],
				// Columns to show as True/False
				trufalse: [],
				// Columns to show as button to do actions
				action: [],
				// Columns list
				columns: [],
				// nbr to show
				toshow: [10,25,50,100,200,500],
				// Column to sort in init
				tosort: [],
				// Theme to load 0 / 1-9
				loading: 0,
				// Text to show on loading = 0
				loadtxt: 'Apollon', 
				// Pagination style
				pagination: 1,
				// JS Function to execute on init
				callback: function(){},
				// JS Function to execute on init after AJAX load
				callbackAjax: function(){},
				// 
				exportCSV: false, 
				exportXML: false, 
				exportPDF: false, 
				exportSQL: false, 
				// Language when there is no js file
				english: {
			        'nodata':'No data to show !', 
			        'loading':'Loading...', 
			        'show_1':'Show', 
			        'line_1':'entries', 
			        'search':'Search', 
			        'show_2':'Showing', 
			        'tooo_1':'to', 
			        'ooof_1':'of', 
			        'line_2':'entries', 
			        'noexport':'To export, you have to include exportation plugins', 
			        'refresh':'Refresh', 
			        'export':'Export', 
			        'listmod':'Normal View', 
			        'tablemod':'Table View', 
			        'toshow':'To show', 
			        'functions':'Functions', 
			        'stats':'Statistics', 
			        'graph':'Graph', 
			        'selection':'Select', 
			        'filtring':'Filtering', 
			        'print':'Print', 
			        'column':'Column', 
			        'operation':'operation', 
			        'value':'Value', 
			        'show':'Show', 
			        'abscis':'Abscissa', 
			        'coordo':'Coordinates', 
			        'error':'Error', 
			        'typ':'Type', 
			        'sum':'Sum', 
			        'avg':'Average', 
			        'max':'Max', 
			        'min':'Min', 
			        'nbr':'Number', 
			        'ext':'Extent', 
			        'q1':'Q1', 
			        'q2':'Median', 
			        'q3':'Q3', 
			        'iqr':'IQR', 
			        'draw':'Graph', 
			        'count':'Number of times', 
			        'points':'Points', 
			        'lines':'Lines', 
			        'lines_bg':'Lines - background', 
			        'lines_step':'Lines - steps', 
			        'bars':'Bars', 
			        'circle':'Circle', 
			        'nofilter':'Delete', 
			        'true':'Yes', 
			        'false':'Non'
				}, 
				// Language by default
				lang: 'en'
			}, b);

			return this.each(function() {
				/*==============
				// All variables
				====================*/
				// This
	    		var _this	= $(this).attr('id'), 
	    		// All data
	    		apollon_all = [], 
	    		// Working data
	    		apollon 	= [], 
	    		// Columns
		    	apollonHead = [], 
	    		// Columns to show
		    	aplnheadshow= [], 
	    		// Columns to search in
		    	aplnheadsrch= [], 
	    		// XXXXXXXXXXXXXXX
		    	numericcolon= [], 
	    		// filters list
		    	filter_list = {}, 
	    		// Mode of show table, list....
		    	modeofshowlt = (a.showmode=='list' || a.showmode=='html') ? 0 : 1, 
	    		// XXXXXXXXXXXXXXX
		    	numericexist= 0, 
	    		// Numbre of all pages
		    	allpages 	= 0, 
	    		// Current page
		    	pageact 	= 1, 
	    		// number to show in one page
		    	nbrperpage  = 10, 
	    		// Count all lines number
		    	allitems 	= 0, 
	    		// First line to show
		    	firstitem 	= 0, 
	    		// Last line to show
		    	toitem		= 0, 
	    		// Column to sort
		    	sortcol		= 0, 
	    		// Direction of sort
		    	coldirect	= 0, 
	    		// Word to search
		    	searchval	= '', 
	    		// Enable export
		    	enableexport= false, 
	    		// Enable excel export
		    	exportexcell= false, 
	    		// Enable PDF export
		    	exportpdfpsb= false, 
	    		// Enable Tooltipster
		    	tooltipstere= false, 
	    		// Enable Flote 
		    	flotenablexx= false, 
	    		// Enable Pie
		    	flotpienable= false, 
		    	// Filters exists
		    	fltr_ex		= false, 
	    		// Class
		    	cls='', 
	    		// Loader style
	    		loaders = {
	                1:{'file':'audio', 'width':40, 'color':'1ABC9C'}, 
	                2:{'file':'rings', 'width':60, 'color':'34495E'}, 
	                3:{'file':'grid', 'width':40, 'color':'F39C12'}, 
	                4:{'file':'hearts', 'width':80, 'color':'9B59B6'}, 
	                5:{'file':'oval', 'width':50, 'color':'3498DB'}, 
	                6:{'file':'three-dots', 'width':60, 'color':'E74C3C'}, 
	                7:{'file':'spinning-circles', 'width':50, 'color':'2ECC71'}, 
	                8:{'file':'puff', 'width':50, 'color':'2C3E50'}, 
	                9:{'file':'circles', 'width':50, 'color':'F1C40F'}, 
	                10:{'file':'tail-spin', 'width':50, 'color':'8E44AD'}, 
	                11:{'file':'bars', 'width':40, 'color':'2980B9'}, 
	                12:{'file':'ball-triangle', 'width':50, 'color':'E74C3C'}
	    		}, 
				predicateBy = function(prop, dirkt) {
					var sortnbr = a.sortnbr, specialsort = a.specialsort, xx, yy, tsts = prop.replace('sort_', '');
					return function(b,c) {
						xx = b[prop];
						yy = c[prop];
						if ( sortnbr.indexOf(tsts)>=0 || specialsort.indexOf(tsts)>=0 ) {
							xx = xx?.toString() || xx;
							xx = xx?.replace(' ', '') || xx;
							xx = parseFloat(xx);
							yy = yy?.toString() || yy;
							yy = yy?.replace(' ', '') || yy;
							yy = parseFloat(yy);
						}
						if (dirkt==1 || dirkt=='asc') {
							if (xx > yy) return 1;
							else if(xx < yy) return -1;
					    	return 0;
						} else {
							if (xx < yy) return 1;
							else if(xx > yy) return -1;
					    	return 0;
						}
					}
				}, 
	    		xsort = function(_this, sortcol, coldirect) {
	    			coldirect = coldirect?.toLowerCase() || coldirect;
	    			if (coldirect=='asc') coldirect=1;
	    			if (coldirect=='desc') coldirect=0;
					var specialsort = a.specialsort;
					if (specialsort.indexOf(sortcol)>=0) sortcol = 'sort_'+sortcol;
					if (typeof(Storage) !== "undefined") {
						var tblck_o='apollontable_'+tableID+'_o', tblck_c='apollontable_'+tableID+'_c';
						window.localStorage.setItem(tblck_o, coldirect);
						window.localStorage.setItem(tblck_c, sortcol);
					}
					apollon.sort( predicateBy(sortcol, coldirect) );
		    		createIntCont(_this);
	    		},
	    		cleantotag = function(txt) {
	    			txt = txt?.toLowerCase() || txt;
	    			txt = txt.replace(/[^0-9a-z]/gi,'');
	    			return txt;
	    		},
	    		setFilter = function(fltr, fltr_val) {
	    			var condi={}, fl_a='', fl_b='', seln = $('select.itm-sect-sel').length;
	    			$('#'+_this+'-allContent').css({'height':'auto'});
	    			if (seln==0) {
		    			$('.apollon-sidebar a[data-filter="'+fltr+'"][data-value="'+fltr_val+'"]').parent().parent().find('a').removeClass('selected');
		    			$('.apollon-sidebar a[data-filter="'+fltr+'"][data-value="'+fltr_val+'"]').addClass('selected');
		    			$('.apollon-sidebar a[data-filter="'+fltr+'"][data-value="'+fltr_val+'"]').parent().parent().find('a span').removeClass('apollon-circle').removeClass('apollon-circle-empty').addClass('apollon-circle-empty');
		    			$('.apollon-sidebar a[data-filter="'+fltr+'"][data-value="'+fltr_val+'"] span').addClass('apollon-circle').removeClass('apollon-circle-empty');

	    				var uls=$('#'+_this+'apollon-sidebar ul'), ul;

		    			for (var i = 0; i < uls.length; i++) {
		    				ul = uls[i];
		    				fl_a=$(ul).find('li a.selected').attr('data-filter');
		    				fl_b=$(ul).find('li a.selected').attr('data-value');
		    				if (fl_a!==undefined && fl_b!==undefined) if (fl_a.length>0 && fl_b.length>0) condi[fl_a]=fl_b;
		    			}

		    			if (Object.keys(condi).length>0) {
		    				var appolo = [], lin={}, exs=1, notag='';
		    				for (var i in apollon_all) {
		    					lin = apollon_all[i];
		    					exs=1;
		    					for (var j in condi) {
		    						if (condi[j]=='true' || condi[j]=='false') {
		    							if ((condi[j]=='true' && lin[j]!=true) || (condi[j]=='false' && lin[j]!=false)) exs=0;
		    						} else {
		    							notag=lin[j];
		    							notag = typeof notag === 'string' ? notag.replace(/<\/?[^>]+(>|$)/g, "") : '';
		    							if (condi[j]!='no_filter' && (notag === undefined || notag!=condi[j])) exs=0;
		    						}
		    					}
		    					if (exs==1) appolo.push(apollon_all[i]);
		    				}
							apollon = appolo;
		    				allitems = apollon.length;
		    				allpages = Math.ceil(allitems/nbrperpage);
		    				pageact = 1;
		    				firstitem = 0;
		    				toitem = (allitems>nbrperpage) ? nbrperpage : allitems ;
							createIntCont(_this);
		    			} else {
							apollon = apollon_all;
		    				allitems = apollon_all.length;
		    				allpages = Math.ceil(allitems/nbrperpage);
		    				pageact = 1;
		    				firstitem = 0;
		    				toitem = (allitems>nbrperpage) ? nbrperpage : allitems ;
							createIntCont(_this);
		    			}
	    			} else {
	    				var uls=$('select.itm-sect-sel'), ul;
		    			for (var i = 0; i < uls.length; i++) {
		    				ul = uls[i];
		    				fl_a=$(ul).attr('name');
		    				fl_b=$(ul).find(":selected").val();
		    				if (fl_a!==undefined && fl_b!==undefined) if (fl_a.length>0 && fl_b.length>0) condi[fl_a]=fl_b;
		    			}

		    			if (Object.keys(condi).length>0) {
		    				var appolo = [], lin={}, exs=1, notag='';
		    				for (var i in apollon_all) {
		    					lin = apollon_all[i];
		    					exs=1;
		    					for (var j in condi) {
		    						if (condi[j]=='true' || condi[j]=='false') {
		    							if ((condi[j]=='true' && lin[j]!=true) || (condi[j]=='false' && lin[j]!=false)) exs=0;
		    						} else {
		    							notag=lin[j];
		    							notag = (typeof(notag) === 'string') ? notag.replace(/<\/?[^>]+(>|$)/g, "") : notag;
		    							if (condi[j]!='no_filter' && (notag === undefined || notag!=condi[j])) exs=0;
		    						}
		    					}
		    					if (exs==1) appolo.push(apollon_all[i]);
		    				}
							apollon = appolo;
		    				allitems = apollon.length;
		    				allpages = Math.ceil(allitems/nbrperpage);
		    				pageact = 1;
		    				firstitem = 0;
		    				toitem = (allitems>nbrperpage) ? nbrperpage : allitems ;
							createIntCont(_this);
		    			} else {
							apollon = apollon_all;
		    				allitems = apollon_all.length;
		    				allpages = Math.ceil(allitems/nbrperpage);
		    				pageact = 1;
		    				firstitem = 0;
		    				toitem = (allitems>nbrperpage) ? nbrperpage : allitems ;
							createIntCont(_this);
		    			}
	    			}
    				var hs=$('#'+_this+'apollon-sidebar').height(), 
    					ht=$('#'+_this+'-allContent').height();
    				if (hs>=ht) $('#'+_this+'-allContent').css({'height':hs+'px'});
	    					else $('#'+_this+'-allContent').css({'height':'auto'});
	    		},
	    		events = function(_this) {
					$('.column100').unbind('mouseover').on('mouseover',function(){
						var table1 = $(this).parent().parent().parent();
						var table2 = $(this).parent().parent();
						var verTable = $(table1).data('vertable')+"";
						var column = $(this).data('column') + ""; 

						$(table2).find("."+column).addClass('hov-column-'+ verTable);
						$(table1).find(".row100.head ."+column).addClass('hov-column-head-'+ verTable);
						$(table1).find(".row100.foot ."+column).addClass('hov-column-head-'+ verTable);
					});
					$('.column100').unbind('mouseout').on('mouseout',function(){
						var table1 = $(this).parent().parent().parent();
						var table2 = $(this).parent().parent();
						var verTable = $(table1).data('vertable')+"";
						var column = $(this).data('column') + ""; 

						$(table2).find("."+column).removeClass('hov-column-'+ verTable);
						$(table1).find(".row100.head ."+column).removeClass('hov-column-head-'+ verTable);
						$(table1).find(".row100.foot ."+column).removeClass('hov-column-head-'+ verTable);
					});
					$('#'+_this+'dropone [type="checkbox"]').unbind('change').change(function(){
						aplnheadshow = [];
						var chk = $('#'+_this+'dropone').find('[type="checkbox"]');					
			    		for (var i = 0; i < chk.length; i++) {
			    			var colo = $(chk[i]).attr('name');
			    			if ($(chk[i]).prop('checked')==true) aplnheadshow.push(colo);
			    		}
						if (typeof(Storage) !== "undefined") {
							var tblck_1='apollontable_'+tableID+'_1';
							window.localStorage.setItem(tblck_1, JSON.stringify(aplnheadshow));
						}
		    			createIntCont(_this);
					});
					$('#'+_this+'droptwo [type="checkbox"]').unbind('change').change(function(){
						aplnheadsrch = [];
						var chk = $('#'+_this+'droptwo').find('[type="checkbox"]');					
			    		for (var i = 0; i < chk.length; i++) {
			    			var colo = $(chk[i]).attr('name');
			    			if ($(chk[i]).prop('checked')==true) aplnheadsrch.push(colo);
			    		}
						if (typeof(Storage) !== "undefined") {
							var tblck_1='apollontable_'+tableID+'_2';
							window.localStorage.setItem(tblck_1, JSON.stringify(aplnheadsrch));
						}
					});
		    		$('#'+_this+'-txt1').unbind('change').change(function(){
		    			nbrperpage = parseInt($(this).val());
		    			allpages=Math.ceil(allitems/nbrperpage);
		    			pageact=1;
		    			firstitem=0;
		    			toitem = (nbrperpage<allitems) ? nbrperpage : allitems;
						if (typeof(Storage) !== "undefined") {
							var tblck_n='apollontable_'+tableID+'_n';
							window.localStorage.setItem(tblck_n, nbrperpage);
						}
		    			createIntCont(_this);
		    		});
		    		$('#'+_this+'table .head th, #'+_this+'table .foot th').unbind('click').click(function(){
			    		sortcol = $(this).html();
						var specialsort = a.specialsort;
						coldirect = 1 - coldirect;
						if (specialsort.indexOf(sortcol)>=0) sortcol = 'sort_'+sortcol;
						if (typeof(Storage) !== "undefined") {
							var tblck_o='apollontable_'+tableID+'_o', tblck_c='apollontable_'+tableID+'_c';
							window.localStorage.setItem(tblck_o, coldirect);
							window.localStorage.setItem(tblck_c, sortcol);
						}
						apollon.sort( predicateBy(sortcol, coldirect) );
			    		createIntCont(_this);
		    		});
		    		$('#'+_this+'-txt2 input').unbind('keyup').keyup(function(e){
		    			searchval = $(this).val(), that=this;
		    			const last = searchval.charAt(searchval.length - 1);
		    			if (last=='-') searchval = searchval.substring(0,searchval.length - 1);
		    			apollon = [];
		    			allitems = apollon_all.length;
		    			var nbr_found = 0;
		    			for (var i = 0; i < allitems; i++) {
		    				var tbl = apollon_all[i], line = '';
		    				for (var j = 0; j < apollonHead.length; j++) {
		    					var val = tbl[apollonHead[j]];
		    					if ( aplnheadsrch.indexOf(apollonHead[j])>=0 ) line = line + val + '-';
		    				}
							var searchvalreg = (last=='--') ? new RegExp(searchval+'-', "gi") : new RegExp(searchval, "gi");
								result = line.match(searchvalreg);
								result = (line.match(searchvalreg)||[]).length;

							if (result > 0) {
								apollon.push(apollon_all[i]);
								nbr_found++;
							}
		    			}
		    			if (searchval.length==0) {
		    				apollon = apollon_all;
		    				allitems = apollon_all.length;
		    				pageact = 1;
		    				allpages = Math.ceil(allitems/nbrperpage);
		    				firstitem = 0;
		    				toitem = (allitems>nbrperpage) ? nbrperpage : allitems ;
		    			} else {
		    				allitems = nbr_found;
		    				allpages = Math.ceil(allitems/nbrperpage);
		    				pageact = 1;
		    				firstitem = 0;
		    				toitem = (allitems>nbrperpage) ? nbrperpage : allitems ;
		    			}
						var code = e.keyCode || e.which;
						if (typeof(Storage) !== "undefined") {
							var tableID=a.tableID, tblck_r='apollontable_'+tableID+'_r';
							window.localStorage.setItem(tblck_r, searchval);
						}
						createIntCont(_this);
						var searchInput = $('#'+_this+'-txt2 input');
						var strLength = searchInput.val().length * 2;
						searchInput.focus();
						searchInput[0].setSelectionRange(strLength, strLength);
		    		});

					$('#'+_this+'-refresh').unbind('click').click(function(){
						if (a.datatype=='ajax') ajaxload(_this); else {
							apollon = apollon_all;
		    				allitems = apollon_all.length;
		    				allpages = Math.ceil(allitems/nbrperpage);
		    				pageact = 1;
		    				firstitem = 0;
		    				toitem = (allitems>nbrperpage) ? nbrperpage : allitems ;
							setContent(_this);
						}
					});
					$('#'+_this+'-print').unbind('click').click(function(){print( _this )});
					$('#'+_this+'-what2show').unbind('click').click(function(){what2show( _this )});
					$('#'+_this+'-selfilterz').unbind('click').click(function(){setFilterzsel( _this )});
					$('#'+_this+'-drawgraph').unbind('click').click(function(){drawgraph( _this )});
					$('#'+_this+'-listable').unbind('click').click(function(){listable( _this )});

					$('#'+_this+'-func-a').unbind('click').click(function(){funcCalc( _this )});
					$('#'+_this+'-func-v').unbind('click').click(function(){funcStat( _this )});
					$('#'+_this+'-func-c').unbind('click').click(function(){funcVarEca( _this )});
					$('#'+_this+'-func-d').unbind('click').click(function(){funcDevia( _this )});
					$('#'+_this+'-func-e').unbind('click').click(function(){funcAbsDev( _this )});

					// Export Table
					$('#'+_this+'-export-csv').unbind('click').click(function(){exportCSV( _this )});
					$('#'+_this+'-export-msexcel').unbind('click').click(function(){exportExcel( _this )});
					$('#'+_this+'-export-xml').unbind('click').click(function(){exportXML( _this )});
					$('#'+_this+'-export-pdf').unbind('click').click(function(){exportPDF( _this )});
					$('#'+_this+'-export-sql').unbind('click').click(function(){exportSQL( _this )});

		    		if (jQuery().tooltipster) {
			    		$('.tooltipster').tooltipster({
						    theme: 'tooltipster-shadow', 
							animation: 'fade',
							delay: 200, 
							interactive: true, 
							repositionOnScroll: true, 
							contentAsHTML: true,     
							content: lng['loading'],
						    functionBefore: function(instance, helper) {
						        var $origin = $(helper.origin), 
						        	id = $origin.attr('data-id'), 
						        	val = $origin.attr('data-val'), 
						        	url = $origin.attr('data-url');
						        if ($origin.data('loaded') !== true) {
									$.post(url, {id:id, val:val}, 
									    function(data){
							                instance.content(data);
							                $origin.data('loaded', true);
									    }
									);
						        }
						    }
						});
					}

					$('#'+_this+'dropone-btn').unbind('click').click(function(){hidedrop(_this);dropone(_this)});
					$('#'+_this+'droptwo-btn').unbind('click').click(function(){hidedrop(_this);droptwo(_this)});
					$('#'+_this+'dropthree-btn').unbind('click').click(function(){hidedrop(_this);dropthree(_this)});
	    			$('#'+_this+'-fullscr').unbind('click').click(function(){
	    				var stat = parseInt($(this).attr('name'));
	    				if (stat==0) {
	    					$('body').removeClass('apollontablefull').addClass('apollontablefull');
	    					$('#'+_this+'table').parent().parent().parent().parent().removeClass('apollontable-fullfixed').addClass('apollontable-fullfixed');
	    					$(this).attr('name', 1);
	    					$(this).html('<i class="apollon-resize-small"></i>');
	    				} else {
	    					$('body').removeClass('apollontablefull');
	    					$('#'+_this+'table').parent().parent().parent().parent().removeClass('apollontable-fullfixed');
	    					$(this).attr('name', 0);
	    					$(this).html('<i class="apollon-resize-full"></i>');
	    				}
	    			});
	    			$('[data-typ="filter"]').unbind('click').click(function() {
	    				var filter=$(this).attr('data-filter'), 
	    					value=$(this).attr('data-value');
	    				setFilter(filter, value)
	    			});
	    			$('select.itm-sect-sel').unbind('change').change(function() {
	    				var filter=$(this).attr('name'), 
	    					value=$(this).val();
	    				setFilter(filter, value)
	    			});
		    		$('#'+_this+'-txt4 .pagination a').unbind('click').click(function(){
		    			pageact = parseInt($(this).attr('name'));
		    			firstitem=parseInt((pageact-1) * nbrperpage);
		    			toitem=firstitem + parseInt(nbrperpage);
		    			if (toitem>allitems) toitem=allitems;
		    			$('#'+_this+'-txt4 .pagination a').removeClass('is-active');
		    			$('#'+_this+'-txt4 .pagination a[name="'+pageact+'"]').addClass('is-active');

						if (typeof(Storage) !== "undefined") {
							var tblpg_1='apollontable_'+tableID+'_p';
							window.localStorage.setItem(tblpg_1, pageact);
						}
		    			createIntCont(_this);
		    		});
					window.onclick = function(event) {
						var aaa=document.getElementsByClassName('dropbtn')[0].contains(event.target), 
							bbb=document.getElementsByClassName('dropbtn')[1].contains(event.target), 
							ccc=document.getElementsByClassName('dropbtn')[2].contains(event.target);
						if (!aaa && !bbb && !ccc) hidedrop(_this);
					}
    				var hs=$('#'+_this+'apollon-sidebar').height(), 
    					ht=$('#'+_this+'-allContent').height();
    				if (hs>=ht) $('#'+_this+'-allContent').css({'height':hs+'px'});
	    					else $('#'+_this+'-allContent').css({'height':'auto'});
	    		},
	    		hidedrop = function(_this) {$(".dropdown-content").removeClass("show");}, 
	    		dropone = function(_this) {$('#'+_this+'dropone').removeClass("show").addClass("show");}, 
	    		droptwo = function(_this) {$('#'+_this+'droptwo').removeClass("show").addClass("show");}, 
	    		dropthree = function(_this) {$('#'+_this+'dropthree').removeClass("show").addClass("show");},
	    		getHashValue = function(_this, key) {},
	    		setContent = function(_this) {
                    sortcolz = a.tosort;
                    sortcol = sortcolz[0];
                    coldirect = sortcolz[1];
                    var specialsort = a.specialsort;
                    coldirect = coldirect?.toLowerCase() || coldirect;
	    			if (coldirect=='asc') coldirect=1;
	    			if (coldirect=='desc') coldirect=0;
                    if (specialsort.indexOf(sortcol)>=0) sortcol = 'sort_'+sortcol;
                    if (typeof(Storage) !== "undefined") {
                        var tblck_o='apollontable_'+tableID+'_o', tblck_c='apollontable_'+tableID+'_c';
                        window.localStorage.setItem(tblck_o, coldirect);
                        window.localStorage.setItem(tblck_c, sortcol);
                    }
                    apollon.sort( predicateBy(sortcol, coldirect) );
					createCont(_this);
				},
	    		createCont = function(_this) {
	    			$('#'+_this).parent().html('<div id="'+_this+'-block" class="apollon-block tomythem-1"></div>');
	    		// Top filters dropdown
	    			var cod='<div class="row apollon-details"><div class="col-md-6 col-sm-12"><label><div class="dropdown" id="dropdown-1"><button id="'+_this+'dropone-btn" class="dropbtn"><i class="apollon-eye"></i></button><div id="'+_this+'dropone" class="dropdown-content">';
	    			for (var i = 0; i < apollonHead.length; i++) {
	    				nbr=i+1;
	    				if (apollonHead[i]==sortcol) {if (coldirect==0) cls = ' tobot'; else cls = ' totop'}
	    				cod+='<a href="javascript:;"><div class="checkbox checkbox-primary"><label><input class="styled" type="checkbox"'+((aplnheadshow.indexOf(apollonHead[i])>-1)?' checked="checked"':'')+' name="'+apollonHead[i]+'"><span>'+apollonHead[i]+'</span></label></div></a>';
	    			}
	    			cod+='</div></div>';
	    		// Top filters list
	    			cod+='<select class="custom-select custom-select-sm form-control form-control-sm" id="'+_this+'-txt1">';
	    			var toshow=a.toshow;
	    			for (var i=0; i < toshow.length; i++) {
	    				cod+='<option value="'+toshow[i]+'"'+((toshow[i]==nbrperpage)?' selected':'')+'>'+toshow[i]+'</option>';
	    			}
	    			cod+='</select></label></div>';
	    		// Top filters Search
	    			cod+='<div class="col-md-6 col-sm-12 text-right"><div id="'+_this+'-txt2"><label><input type="search" class="form-control form-control-sm" placeholder="'+lng['search']+'" value="'+((typeof(searchval)!==undefined && searchval!=null)?searchval:'')+'"><div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups"><div class="btn-group me-2" role="group" aria-label="Second group"><div class="dropdown left-drop" id="dropdown-2"><button id="'+_this+'droptwo-btn" class="dropbtn"><i class="apollon-search"></i></button><div id="'+_this+'droptwo" class="dropdown-content">';
	    			for (var i = 0; i < apollonHead.length; i++) {
	    				nbr=i+1;
	    				if (apollonHead[i]==sortcol) {if (coldirect==0) cls = ' tobot'; else cls = ' totop'}
	    				cod+='<a href="javascript:;"><div class="checkbox checkbox-primary"><label><input class="styled" type="checkbox"'+((aplnheadsrch.indexOf(apollonHead[i])>-1)?' checked="checked"':'')+' name="'+apollonHead[i]+'"><span>'+apollonHead[i]+'</span></label></div></a>';
	    			}
	    		// Men
	    			cod+='</div></div><div class="dropdown left-drop" id="dropdown-3"><button id="'+_this+'dropthree-btn" class="dropbtn"><i class="apollon-ellipsis"></i></button><div id="'+_this+'dropthree" class="dropdown-content"></div></div><button type="button" class="btn btn-primary" id="'+_this+'-fullscr" name="0"><i class="apollon-resize-full"></i></button></div></div></label></div></div></div>';
	    			cod+='<div class="row apollon-filters hidden" id="'+_this+'-filters"></div></div><div class="apollon-content table100 tomythem-'+a.theme+'">';
	    		// Sidebar
	    			var filters=a.filters, fltr_ex=(filters.length>0)?true:false;
	    			cod+='<div class="apollon-sidebar'+((!fltr_ex)?' hidden':'')+'" id="'+_this+'apollon-sidebar"></div>';
	    		// Content
	    			cod+='<div class="table-responsive'+((fltr_ex)?' withsidebar':'')+'" id="'+_this+'-allContent">';
	    			cod+='</div></div>';
	    			cod+='<div class="row apollon-details"><div class="col-md-6 col-sm-12 '+_this+'-txt3" id="'+_this+'-txt3"></div><div class="col-md-6 col-sm-12 text-right"><div class="dataTables_paginate paging_simple_numbers" id="'+_this+'-txt4"></div></div></div></div>';
	    			$('#'+_this+'-block').html(cod);
	    			cod='';
					if (a.showmode=='list') {

		    			if (apollon.length > 0) {
			    			cod = '';
			    			nbr=0;
			    			var lastitem = (toitem<allitems) ? toitem : allitems, 
			    				tolist = a.tolist, 
			    				toimg = a.toimg, 
			    				trufalse = a.trufalse, 
			    				action = a.action;

			    			for (var i = firstitem; i < lastitem; i++) {
			    				var tbl = apollon[i];
			    				cod += '<dl class="tomylist dl-horizontal"'+((typeof tbl['color'] != 'undefined')?' data-color="'+tbl['color']+'"':'')+((typeof tbl['ID'] != 'undefined')?' data-id="'+tbl['ID']+'"':'')+'>';
			    				for (var j = 0; j < apollonHead.length; j++) {
			    					nbr=j+1;
			    					var val = tbl?.[apollonHead[j]];

					       			hide_cls = '';
						    		if ( aplnheadshow.indexOf(apollonHead[j])>=0  && typeof val != 'undefined') {
				    					cod += '<dt class="column100 column'+nbr+hide_cls+'" data-column="column'+nbr+'" data-label="'+apollonHead[j]+'">'+apollonHead[j]+'</dt><dd class="column100 column'+nbr+hide_cls+'" data-column="column'+nbr+'" data-label="'+apollonHead[j]+'">';

							    		if ( action.indexOf(apollonHead[j])>=0 ) {
							    			if (val===undefined) {
				    							var x=val;
					    						cod += '<a id="'+x['id']+'" href="javascript:'+x['click']+';" class="apollonbtn btn-'+x['color']+'">'+x['content']+'</a>';
							    			} else {
					    						for (var n=0;n<val.length;n++) {
					    							var x=val[n];
					    							if (x?.['tooltip']!==undefined) cod += '<a id="'+x['id']+'-'+x['toolid']+'" data-url="sources/ajax/load/'+x['tooltip']+'.php" data-id="'+x['toolid']+'" data-val="0" href="'+x['click']+'" target="_blank" class="apollonbtn btn-'+x['color']+' tooltipster">'+x['content']+'</a>';
						    						else cod += '<a id="'+x['id']+'" href="javascript:'+x['click']+';" class="apollonbtn btn-'+x['color']+'">'+x['content']+'</a>';
					    						}
							    			}
							    		} else if (tolist.indexOf(apollonHead[j])>=0) {
							    			cod += '<ul class="'+_this+'-list">';
				    						for (var n=0;n<val.length;n++) {
				    							var x=val[n];
					    						cod += '<li>'+x+'</li>';
				    						}
							    			cod += '</ul>';
							    		} else if (toimg.indexOf(apollonHead[j])>=0) {

							    			var img_src = (typeof val['src'] !== 'undefined') ? ' src="'+val['src']+'"' : '', 
							    				img_alt = (typeof val['alt'] !== 'undefined') ? ' alt="'+val['alt']+'"' : '', 
							    				img_idd = (typeof val['id'] !== 'undefined') ? ' id="'+val['id']+'"' : '', 
							    				img_cls = (typeof val['class'] !== 'undefined') ? ' class="'+val['class']+' '+_this+'-image"' : ' class="'+_this+'-image"';

				    						cod += '<img'+img_src+img_alt+img_idd+img_cls+' />';

							    		} else if (trufalse.indexOf(apollonHead[j])>=0) {
							    			cod += (val===true) ? '<i class="apollon-ok-circled"></i>' : '<i class="apollon-circle-empty"></i>';
							    		}
							    		/* else if (action.indexOf(apollonHead[j])>=0) {
							    		}*/
							    		 else  {

				    						/*if (searchval.length>0) {
				    							var searchvalreg = new RegExp(searchval, "gi");
												if (val !== null && val !== 0 && typeof(val) !== 'undefined') {
													alert(val);
													alert(searchval);
													val=val.replace(searchvalreg, "<b class=\"searchword\">"+searchval.toUpperCase()+"</b>");
				    							} else val = '';
				    						}*/
											cod += val;

				    					}
				    					cod += '</dd>';
						    		}
			    				}
			    				cod += '</dl><hr class="small-hr"/>';
			    			}
			    			$('#'+_this+'-allContent').html(cod);
			    			$('#'+_this+'-txt3').html(lng['show_2']+' '+firstitem+' '+lng['tooo_1']+' '+lastitem+' '+lng['ooof_1']+' '+allitems+' '+lng['line_2']);

		    			} else {
		    				cod = '<hr class="small-hr" /><dl class="tomylist dl-horizontal" wfd-id="10"><dt>!!!</dt><dd>'+lng['nodata']+'</dd></dl><hr class="small-hr" />';
		    				$('#'+_this+'-txt3').html(lng['nodata']);
		    				$('#'+_this+'-allContent').html(cod);
		    			}

					} else if (a.showmode=='html') {


						$('#'+_this+'-allContent').html('<div id="'+_this+'x" class="row nomarg"></div>');
						$('#'+_this+'x').addClass('row nomarg');
						var showcode = a.showcode;
		    			cod = '';
		    			nbr=0;
		    			var lastitem = (toitem<allitems) ? toitem : allitems, 
		    				tolist = a.tolist, 
		    				toimg = a.toimg, 
		    				trufalse = a.trufalse, 
		    				action = a.action;

		    			for (var i = firstitem; i < lastitem; i++) {
		    				var tbl = apollon[i], s_cod=showcode;
		    				for (var j = 0; j < apollonHead.length; j++) {
		    					nbr=j+1;
		    					var val = tbl[apollonHead[j]];
		    					s_cod=s_cod.replaceAll('['+apollonHead[j].toUpperCase()+']', val);
		    				}
		    				cod+=s_cod;
		    			}

						$('#'+_this+'x').html(cod);
		    			if (apollon.length > 0) {
		    				/*
			    			cod = '';
			    			nbr=0;
			    			var lastitem = (toitem<allitems) ? toitem : allitems, 
			    				tolist = a.tolist, 
			    				toimg = a.toimg, 
			    				trufalse = a.trufalse, 
			    				action = a.action;

			    			for (var i = firstitem; i < lastitem; i++) {
			    				var tbl = apollon[i];
			    				cod += '<dl class="tomylist dl-horizontal"'+((typeof tbl['color'] != 'undefined')?' data-color="'+tbl['color']+'"':'')+((typeof tbl['ID'] != 'undefined')?' data-id="'+tbl['ID']+'"':'')+'>';
			    				for (var j = 0; j < apollonHead.length; j++) {
			    					nbr=j+1;
			    					var val = tbl[apollonHead[j]];

					       			hide_cls = '';
						    		if ( aplnheadshow.indexOf(apollonHead[j])>=0  && typeof val != 'undefined') {
				    					cod += '<dt class="column100 column'+nbr+hide_cls+'" data-column="column'+nbr+'" data-label="'+apollonHead[j]+'">'+apollonHead[j]+'</dt><dd class="column100 column'+nbr+hide_cls+'" data-column="column'+nbr+'" data-label="'+apollonHead[j]+'">';

							    		if ( action.indexOf(apollonHead[j])>=0 ) {
							    			if (typeof(val.length)=="undefined") {
				    							var x=val;
					    						cod += '<a id="'+x['id']+'" href="javascript:'+x['click']+';" class="apollonbtn btn-'+x['color']+'">'+x['content']+'</a>';
							    			} else {
					    						for (var n=0;n<val.length;n++) {
					    							var x=val[n];
					    							if (typeof(x['tooltip'])!="undefined") cod += '<a id="'+x['id']+'-'+x['toolid']+'" data-url="sources/ajax/load/'+x['tooltip']+'.php" data-id="'+x['toolid']+'" data-val="0" href="'+x['click']+'" target="_blank" class="apollonbtn btn-'+x['color']+' tooltipster">'+x['content']+'</a>';
						    						else cod += '<a id="'+x['id']+'" href="javascript:'+x['click']+';" class="apollonbtn btn-'+x['color']+'">'+x['content']+'</a>';
					    						}
							    			}
							    		} else if (tolist.indexOf(apollonHead[j])>=0) {
							    			cod += '<ul class="'+_this+'-list">';
				    						for (var n=0;n<val.length;n++) {
				    							var x=val[n];
					    						cod += '<li>'+x+'</li>';
				    						}
							    			cod += '</ul>';
							    		} else if (toimg.indexOf(apollonHead[j])>=0) {

							    			var img_src = (typeof val['src'] !== 'undefined') ? ' src="'+val['src']+'"' : '', 
							    				img_alt = (typeof val['alt'] !== 'undefined') ? ' alt="'+val['alt']+'"' : '', 
							    				img_idd = (typeof val['id'] !== 'undefined') ? ' id="'+val['id']+'"' : '', 
							    				img_cls = (typeof val['class'] !== 'undefined') ? ' class="'+val['class']+' '+_this+'-image"' : ' class="'+_this+'-image"';

				    						cod += '<img'+img_src+img_alt+img_idd+img_cls+' />';

							    		} else if (trufalse.indexOf(apollonHead[j])>=0) {
							    			cod += (val===true) ? '<i class="apollon-ok-circled"></i>' : '<i class="apollon-circle-empty"></i>';
							    		} else  {
											cod += val;
				    					}
				    					cod += '</dd>';
						    		}
			    				}
			    				cod += '</dl><hr class="small-hr"/>';
			    			}
			    			$('#'+_this+'-allContent').html(cod);
			    			$('#'+_this+'-txt3').html(lng['show_2']+' '+firstitem+' '+lng['tooo_1']+' '+lastitem+' '+lng['ooof_1']+' '+allitems+' '+lng['line_2']);
			    			*/
		    			} else {
		    				cod = '<hr class="small-hr" /><dl class="tomylist dl-horizontal" wfd-id="10"><dt>!!!</dt><dd>'+lng['nodata']+'</dd></dl><hr class="small-hr" />';
		    				$('#'+_this+'-txt3').html(lng['nodata']);
		    				$('#'+_this+'-allContent').html(cod);

		    			}

					} else {

						cod+='<table id="'+_this+'table" class="table table-apollon table-striped table-sm" data-vertable="tomythem-'+a.theme+'"><thead><tr class="row100 head">';
						var nbr=0, col_a = a.hide_sm, col_b = a.hide_md;
		    			for (var i = 0; i < apollonHead.length; i++) {
		    				nbr=i+1;
		    				var cls = '';
		    				if (apollonHead[i]==sortcol) {if (coldirect==0) cls = ' tobot'; else cls = ' totop'}
			       			hide_cls = '';
				    		if ( col_a.indexOf(apollonHead[i])>=0 ) hide_cls+=' hidden-sm';
				    		if ( col_b.indexOf(apollonHead[i])>=0 ) hide_cls+=' hidden-md';
		    				if ( aplnheadshow.indexOf(apollonHead[i])>=0 ) cod += '<th class="column100 column'+nbr+cls+hide_cls+'" data-column="column'+nbr+'" scope="col">'+apollonHead[i]+'</th>';
		    			}
		    			cod+='</tr></thead><tfoot><tr class="row100 foot">';
						var nbr=0, col_a = a.hide_sm, col_b = a.hide_md;
		    			for (var i = 0; i < apollonHead.length; i++) {
		    				nbr=i+1;
		    				var cls = '';
		    				if (apollonHead[i]==sortcol) {if (coldirect==0) cls = ' tobot'; else cls = ' totop'}
			       			hide_cls = '';
				    		if ( col_a.indexOf(apollonHead[i])>=0 ) hide_cls+=' hidden-sm';
				    		if ( col_b.indexOf(apollonHead[i])>=0 ) hide_cls+=' hidden-md';
		    				if ( aplnheadshow.indexOf(apollonHead[i])>=0 ) cod += '<th class="column100 column'+nbr+cls+hide_cls+'" data-column="column'+nbr+'" scope="col">'+apollonHead[i]+'</th>';
		    			}
		    			cod+='</tr></tfoot><tbody></tbody></table>';
		    			$('#'+_this+'-allContent').html(cod);
		    			if (apollon.length > 0) {
			    			cod = '';
			    			nbr=0;
			    			var lastitem = (toitem<allitems) ? toitem : allitems, 
			    				tolist = a.tolist, 
			    				toimg = a.toimg, 
			    				trufalse = a.trufalse, 
			    				action = a.action;

			    			for (var i = firstitem; i < lastitem; i++) {
			    				var tbl = apollon[i];
			    				cod += '<tr class="row100"'+((tbl?.['color'] !== undefined)?' data-color="'+tbl['color']+'"':'')+((tbl?.['ID'] !== undefined)?' data-id="'+tbl['ID']+'"':'')+'>';
			    				for (var j = 0; j < apollonHead.length; j++) {
			    					nbr=j+1;
			    					var val = tbl?.[apollonHead[j]];

					       			hide_cls = '';
						    		if ( col_a.indexOf(apollonHead[j])>=0 ) hide_cls+=' hidden-sm';
						    		if ( col_b.indexOf(apollonHead[j])>=0 ) hide_cls+=' hidden-md';

						    		if ( aplnheadshow.indexOf(apollonHead[j])>=0  && val !== undefined) {
				    					cod += '<td class="column100 column'+nbr+hide_cls+'" data-column="column'+nbr+'" data-label="'+apollonHead[j]+'">';

							    		if ( action.indexOf(apollonHead[j])>=0 ) {
							    			if (val===undefined) {
				    							var x=val;
					    						cod += '<a id="'+x['id']+'" href="javascript:'+x['click']+';" class="apollonbtn btn-'+x['color']+'">'+x['content']+'</a>';
							    			} else {
					    						for (var n=0;n<val.length;n++) {
					    							var x=val[n];
					    							if (x?.['tooltip']!==undefined) cod += '<a id="'+x['id']+'-'+x['toolid']+'" data-url="sources/ajax/load/'+x['tooltip']+'.php" data-id="'+x['toolid']+'" data-val="0" href="'+x['click']+'" target="_blank" class="apollonbtn btn-'+x['color']+' tooltipster">'+x['content']+'</a>';
						    						else cod += '<a id="'+x['id']+'" href="javascript:'+x['click']+';" class="apollonbtn btn-'+x['color']+'">'+x['content']+'</a>';
					    						}
							    			}
							    		} else if (tolist.indexOf(apollonHead[j])>=0) {
							    			cod += '<ul class="'+_this+'-list">';
				    						for (var n=0;n<val.length;n++) {
				    							var x=val[n];
					    						cod += '<li>'+x+'</li>';
				    						}
							    			cod += '</ul>';
							    		} else if (toimg.indexOf(apollonHead[j])>=0) {

							    			var img_src = (val?.['src'] !== 'undefined') ? ' src="'+val['src']+'"' : '', 
							    				img_alt = (val?.['alt'] !== 'undefined') ? ' alt="'+val['alt']+'"' : '', 
							    				img_idd = (val?.['id'] !== 'undefined') ? ' id="'+val['id']+'"' : '', 
							    				img_cls = (val?.['class'] !== 'undefined') ? ' class="'+val['class']+' '+_this+'-image"' : ' class="'+_this+'-image"';

				    						cod += '<img'+img_src+img_alt+img_idd+img_cls+' />';

							    		} else if (trufalse.indexOf(apollonHead[j])>=0) {
							    			cod += (val===true) ? '<i class="apollon-ok-circled"></i>' : '<i class="apollon-circle-empty"></i>';
							    		}
							    		/* else if (action.indexOf(apollonHead[j])>=0) {
							    		}*/
							    		 else  {

				    						/*if (searchval.length>0) {
				    							var searchvalreg = new RegExp(searchval, "gi");
												if (val !== null && val !== 0 && typeof(val) !== 'undefined') {
													alert(val);
													alert(searchval);
													val=val.replace(searchvalreg, "<b class=\"searchword\">"+searchval.toUpperCase()+"</b>");
				    							} else val = '';
				    						}*/
											cod += val;

				    					}
				    					cod += '</td>';
						    		}
			    				}
			    				cod += '</tr>';
			    			}
			    			$('#'+_this+'-allContent table tbody').html(cod);
			    			$('#'+_this+'-txt3').html(lng['show_2']+' '+firstitem+' '+lng['tooo_1']+' '+lastitem+' '+lng['ooof_1']+' '+allitems+' '+lng['line_2']);

		    			} else {
		    				var colnbr = $('#'+_this+'-allContent table thead tr th').length;
		    				cod = '<tr class="row100"><td class="column100 column1" data-column="column1" colspan="'+colnbr+'">'+lng['nodata']+'</td></td>';
		    				$('#'+_this+'-allContent table tbody').html(cod);
		    				$('#'+_this+'-txt3').html(lng['nodata']);
		    				$('#'+_this+' tbody').html(cod);
		    			}
					}
	    			addAccessoir(_this);
	    		},
	    		addAccessoir = function(_this) {
	    		// Menu
	    			var cod='';
	    			cod += '<a href="javascript:;" id="'+_this+'-refresh"><i class="apollon-arrows-cw"></i>'+lng['refresh']+'</a>';
		    		if(jQuery().tableExport) {
		    			cod += '<div class="like-a"><i class="apollon-download-cloud"></i> '+lng['export']+'<i class="apollon-angle-right"></i><div class="second-stage">';
		    			if (a.exportCSV) cod += '<a href="javascript:;" id="'+_this+'-export-csv">CSV</a>';
		    			cod += '<a href="javascript:;" id="'+_this+'-export-msexcel">Excel</a>';
		    			if (a.exportXML) cod += '<a href="javascript:;" id="'+_this+'-export-xml">XML</a>';
		    			if (a.exportPDF) cod += '<a href="javascript:;" id="'+_this+'-export-pdf">PDF</a>';
		    			if (a.exportSQL) cod += '<a href="javascript:;" id="'+_this+'-export-sql">SQL</a>';
		    			cod += '</div></div>';
		    		}
	    			if (a.showmode=='list' || a.showmode=='html') cod += '<a href="javascript:;" id="'+_this+'-listable"><i class="apollon-table"></i> '+lng['tablemod']+'</a>';
	    			else cod += '<a href="javascript:;" id="'+_this+'-listable"><i class="apollon-list-bullet"></i> '+lng['listmod']+'</a>';
	    			cod += '<a href="javascript:;" id="'+_this+'-what2show"><i class="apollon-sliders"></i> '+lng['selection']+'</a>';
	    			cod += '<a href="javascript:;" id="'+_this+'-selfilterz"><i class="apollon-filter"></i> '+lng['filtring']+'</a>';
	    			var functions=a.functions;
	    			if (functions.length>0) {
						cod += '<div class="like-a"><i class="apollon-calc"></i> '+lng['functions']+'<i class="apollon-angle-right"></i><div class="second-stage">';
						cod += '<a href="javascript:;" id="'+_this+'-func-v">'+lng['stats']+'</a>';
						cod += '</div></div>';
	    			}
	    			if((jQuery().plot)) cod += '<a href="javascript:;" id="'+_this+'-drawgraph"><i class="apollon-chart-bar"></i> '+lng['graph']+'</a>';
	    			cod += '<a href="javascript:;" id="'+_this+'-print"><i class="apollon-print"></i> '+lng['print']+'</a>';
	    			$('#'+_this+'dropthree').html(cod);
	    		// Sidebar
	    			var filters=a.filters, filterMaxNum=a.filterMaxNum, fltr_ex=(filters.length>0)?true:false;
	    			if (fltr_ex) {
	    				cod='', nbractx=0, selectaz=0;
	    				for (i in filter_list) {
	    					var filterio = filter_list[i];
	    					if (filterio.length>filterMaxNum) selectaz=1;
	    				}
	    				if (selectaz==0) {
		    				for (i in filter_list) {
		    					cod+='<ul><li><h5>'+i+'</h5></li><li class="itm-sect itm-sect-no_filter"><a class="mail-no_filter" href="javascript:;" data-typ="filter" data-filter="" data-value=""><span class="apollon-circle"></span>'+lng['nofilter']+' <em class="text-muted filter-number"></em></a></li>';
		    					var filterio = filter_list[i], filteriov;
		    					for (var j = 0; j < filterio.length; j++) {
		    						filteriov=filterio[j];
		    						if (filteriov===true) filteriov=lng['true'];
		    						if (filteriov===false) filteriov=lng['false'];
		    						if (filteriov.length>0) nbractx++;
		    						filteriov = filteriov.replace(/<\/?[^>]+(>|$)/g, "");
		    						if (nbractx<=filterMaxNum && filteriov.length>0) cod+='<li class="itm-sect itm-sect-'+cleantotag(i)+'_'+cleantotag(filteriov)+'"><a class="mail-'+cleantotag(i)+'_'+cleantotag(filteriov)+'" href="javascript:;" data-typ="filter" data-filter="'+i+'" data-value="'+((filteriov==lng['true'])?'true':((filteriov==lng['false'])?'false':filteriov))+'"><span class="apollon-circle-empty"></span>'+filteriov+' <em class="text-muted filter-number"></em></a></li>';
		    					}
		    					cod+='</ul>';
		    				}
		    				$('#'+_this+'apollon-sidebar').html(cod);
	    				} else {
	    					var idsq = [];
		    				for (i in filter_list) {
		    					cod+='<ul><li><h5>'+i+'</h5></li><li><select class="itm-sect-sel itm-sect-'+cleantotag(i)+'" id="filter-select-'+cleantotag(i)+'" name="'+i+'"><option value="no_filter">'+lng['nofilter']+'</option>';
		    					var filterio = filter_list[i], filteriov;
		    					idsq.push('#filter-select-'+cleantotag(i));
		    					for (var j = 0; j < filterio.length; j++) {
		    						filteriov=filterio[j];
		    						if (filteriov===true) filteriov=lng['true'];
		    						if (filteriov===false) filteriov=lng['false'];
		    						nbractx++;
		    						filteriov = filteriov.replace(/<\/?[^>]+(>|$)/g, "");
		    						if (filteriov.length>0) cod+='<option value="'+((filteriov==lng['true'])?'true':((filteriov==lng['false'])?'false':filteriov))+'">'+filteriov+'</option>';
		    					}
		    					cod+='</select></li></ul>';
		    				}
		    				$('#'+_this+'apollon-sidebar').html(cod);
		    				if((jQuery().chosen) && idsq.length>0) $(idsq.join(',')).chosen({width:'100%'});
	    				}

	    				
	    				var hs=$('#'+_this+'apollon-sidebar').height(), 
	    					ht=$('#'+_this+'-allContent').height();
	    				if (hs>=ht) $('#'+_this+'-allContent').css({'height':hs+'px'});
	    					else $('#'+_this+'-allContent').css({'height':'auto'});
	    			}
	    			setPagination(_this);
	    		},
	    		createIntCont = function(_this) {
	    			var cod='', showmode=a.showmode;
	    			if (modeofshowlt==1) showmode='table';
	    			if (modeofshowlt==0 && showmode!='list' && showmode!='html') showmode='list';
					if (showmode=='list') {

		    			if (apollon.length > 0) {
			    			cod = '';
			    			nbr=0;
			    			var lastitem = (toitem<allitems) ? toitem : allitems, 
			    				tolist = a.tolist, 
			    				toimg = a.toimg, 
			    				trufalse = a.trufalse, 
			    				action = a.action;

			    			for (var i = firstitem; i < lastitem; i++) {
			    				var tbl = apollon[i];
			    				cod += '<dl class="tomylist dl-horizontal"'+((tbl?.['color'] !== undefined)?' data-color="'+tbl['color']+'"':'')+((tbl?.['ID'] !== undefined)?' data-id="'+tbl['ID']+'"':'')+'>';
			    				for (var j = 0; j < apollonHead.length; j++) {
			    					nbr=j+1;
			    					var val = tbl?.[apollonHead[j]];

					       			hide_cls = '';
						    		if ( aplnheadshow.indexOf(apollonHead[j])>=0  && val !== undefined) {
				    					cod += '<dt class="column100 column'+nbr+hide_cls+'" data-column="column'+nbr+'" data-label="'+apollonHead[j]+'">'+apollonHead[j]+'</dt><dd class="column100 column'+nbr+hide_cls+'" data-column="column'+nbr+'" data-label="'+apollonHead[j]+'">';

							    		if ( action.indexOf(apollonHead[j])>=0 ) {
							    			if (val===undefined) {
				    							var x=val;
					    						cod += '<a id="'+x['id']+'" href="javascript:'+x['click']+';" class="apollonbtn btn-'+x['color']+'">'+x['content']+'</a>';
							    			} else {
					    						for (var n=0;n<val.length;n++) {
					    							var x=val[n];
					    							if (x?.['tooltip']!==undefined) cod += '<a id="'+x['id']+'-'+x['toolid']+'" data-url="sources/ajax/load/'+x['tooltip']+'.php" data-id="'+x['toolid']+'" data-val="0" href="'+x['click']+'" target="_blank" class="apollonbtn btn-'+x['color']+' tooltipster">'+x['content']+'</a>';
						    						else cod += '<a id="'+x['id']+'" href="javascript:'+x['click']+';" class="apollonbtn btn-'+x['color']+'">'+x['content']+'</a>';
					    						}
							    			}
							    		} else if (tolist.indexOf(apollonHead[j])>=0) {
							    			cod += '<ul class="'+_this+'-list">';
				    						for (var n=0;n<val.length;n++) {
				    							var x=val[n];
					    						cod += '<li>'+x+'</li>';
				    						}
							    			cod += '</ul>';
							    		} else if (toimg.indexOf(apollonHead[j])>=0) {

							    			var img_src = (val?.['src'] !== undefined) ? ' src="'+val['src']+'"' : '', 
							    				img_alt = (val?.['alt'] !== undefined) ? ' alt="'+val['alt']+'"' : '', 
							    				img_idd = (val?.['id'] !== undefined) ? ' id="'+val['id']+'"' : '', 
							    				img_cls = (val?.['class'] !== undefined) ? ' class="'+val['class']+' '+_this+'-image"' : ' class="'+_this+'-image"';

				    						cod += '<img'+img_src+img_alt+img_idd+img_cls+' />';

							    		} else if (trufalse.indexOf(apollonHead[j])>=0) {
							    			cod += (val===true) ? '<i class="apollon-ok-circled"></i>' : '<i class="apollon-circle-empty"></i>';
							    		}
							    		/* else if (action.indexOf(apollonHead[j])>=0) {
							    		}*/
							    		 else  {

				    						/*if (searchval.length>0) {
				    							var searchvalreg = new RegExp(searchval, "gi");
												if (val !== null && val !== 0 && typeof(val) !== 'undefined') {
													alert(val);
													alert(searchval);
													val=val.replace(searchvalreg, "<b class=\"searchword\">"+searchval.toUpperCase()+"</b>");
				    							} else val = '';
				    						}*/
											cod += val;

				    					}
				    					cod += '</dd>';
						    		}
			    				}
			    				cod += '</dl><hr class="small-hr"/>';
			    			}
			    			$('#'+_this+'-allContent').html(cod);
			    			$('#'+_this+'-txt3').html(lng['show_2']+' '+firstitem+' '+lng['tooo_1']+' '+lastitem+' '+lng['ooof_1']+' '+allitems+' '+lng['line_2']);

		    			} else {
		    				cod = '<hr class="small-hr" /><dl class="tomylist dl-horizontal" wfd-id="10"><dt>!!!</dt><dd>'+lng['nodata']+'</dd></dl><hr class="small-hr" />';
		    				$('#'+_this+'-txt3').html(lng['nodata']);
		    				$('#'+_this+'-allContent').html(cod);
		    			}

					} else if (showmode=='html') {


						$('#'+_this+'-allContent').html('<div id="'+_this+'x" class="row nomarg"></div>');
						$('#'+_this+'x').addClass('row nomarg');
						var showcode = a.showcode;
		    			cod = '';
		    			nbr=0;
		    			var lastitem = (toitem<allitems) ? toitem : allitems, 
		    				tolist = a.tolist, 
		    				toimg = a.toimg, 
		    				trufalse = a.trufalse, 
		    				action = a.action;

		    			for (var i = firstitem; i < lastitem; i++) {
		    				var tbl = apollon[i], s_cod=showcode;
		    				for (var j = 0; j < apollonHead.length; j++) {
		    					nbr=j+1;
		    					var val = tbl[apollonHead[j]];
		    					s_cod=s_cod.replaceAll('['+apollonHead[j].toUpperCase()+']', val);
		    				}
		    				cod+=s_cod;
		    			}

						$('#'+_this+'x').html(cod);
		    			if (apollon.length > 0) {
		    				/*
			    			cod = '';
			    			nbr=0;
			    			var lastitem = (toitem<allitems) ? toitem : allitems, 
			    				tolist = a.tolist, 
			    				toimg = a.toimg, 
			    				trufalse = a.trufalse, 
			    				action = a.action;

			    			for (var i = firstitem; i < lastitem; i++) {
			    				var tbl = apollon[i];
			    				cod += '<dl class="tomylist dl-horizontal"'+((typeof tbl['color'] != 'undefined')?' data-color="'+tbl['color']+'"':'')+((typeof tbl['ID'] != 'undefined')?' data-id="'+tbl['ID']+'"':'')+'>';
			    				for (var j = 0; j < apollonHead.length; j++) {
			    					nbr=j+1;
			    					var val = tbl[apollonHead[j]];

					       			hide_cls = '';
						    		if ( aplnheadshow.indexOf(apollonHead[j])>=0  && typeof val != 'undefined') {
				    					cod += '<dt class="column100 column'+nbr+hide_cls+'" data-column="column'+nbr+'" data-label="'+apollonHead[j]+'">'+apollonHead[j]+'</dt><dd class="column100 column'+nbr+hide_cls+'" data-column="column'+nbr+'" data-label="'+apollonHead[j]+'">';

							    		if ( action.indexOf(apollonHead[j])>=0 ) {
							    			if (typeof(val.length)=="undefined") {
				    							var x=val;
					    						cod += '<a id="'+x['id']+'" href="javascript:'+x['click']+';" class="apollonbtn btn-'+x['color']+'">'+x['content']+'</a>';
							    			} else {
					    						for (var n=0;n<val.length;n++) {
					    							var x=val[n];
					    							if (typeof(x['tooltip'])!="undefined") cod += '<a id="'+x['id']+'-'+x['toolid']+'" data-url="sources/ajax/load/'+x['tooltip']+'.php" data-id="'+x['toolid']+'" data-val="0" href="'+x['click']+'" target="_blank" class="apollonbtn btn-'+x['color']+' tooltipster">'+x['content']+'</a>';
						    						else cod += '<a id="'+x['id']+'" href="javascript:'+x['click']+';" class="apollonbtn btn-'+x['color']+'">'+x['content']+'</a>';
					    						}
							    			}
							    		} else if (tolist.indexOf(apollonHead[j])>=0) {
							    			cod += '<ul class="'+_this+'-list">';
				    						for (var n=0;n<val.length;n++) {
				    							var x=val[n];
					    						cod += '<li>'+x+'</li>';
				    						}
							    			cod += '</ul>';
							    		} else if (toimg.indexOf(apollonHead[j])>=0) {

							    			var img_src = (typeof val['src'] !== 'undefined') ? ' src="'+val['src']+'"' : '', 
							    				img_alt = (typeof val['alt'] !== 'undefined') ? ' alt="'+val['alt']+'"' : '', 
							    				img_idd = (typeof val['id'] !== 'undefined') ? ' id="'+val['id']+'"' : '', 
							    				img_cls = (typeof val['class'] !== 'undefined') ? ' class="'+val['class']+' '+_this+'-image"' : ' class="'+_this+'-image"';

				    						cod += '<img'+img_src+img_alt+img_idd+img_cls+' />';

							    		} else if (trufalse.indexOf(apollonHead[j])>=0) {
							    			cod += (val===true) ? '<i class="apollon-ok-circled"></i>' : '<i class="apollon-circle-empty"></i>';
							    		} else  {
											cod += val;
				    					}
				    					cod += '</dd>';
						    		}
			    				}
			    				cod += '</dl><hr class="small-hr"/>';
			    			}
			    			$('#'+_this+'-allContent').html(cod);
			    			$('#'+_this+'-txt3').html(lng['show_2']+' '+firstitem+' '+lng['tooo_1']+' '+lastitem+' '+lng['ooof_1']+' '+allitems+' '+lng['line_2']);
			    			*/
		    			} else {
		    				cod = '<hr class="small-hr" /><dl class="tomylist dl-horizontal" wfd-id="10"><dt>!!!</dt><dd>'+lng['nodata']+'</dd></dl><hr class="small-hr" />';
		    				$('#'+_this+'-txt3').html(lng['nodata']);
		    				$('#'+_this+'-allContent').html(cod);

		    			}

					} else {

						cod+='<table id="'+_this+'table" class="table table-apollon table-striped table-sm" data-vertable="tomythem-'+a.theme+'"><thead><tr class="row100 head">';
						var nbr=0, col_a = a.hide_sm, col_b = a.hide_md;
		    			for (var i = 0; i < apollonHead.length; i++) {
		    				nbr=i+1;
		    				var cls = '';
		    				if (apollonHead[i]==sortcol) {if (coldirect==0) cls = ' tobot'; else cls = ' totop'}
			       			hide_cls = '';
				    		if ( col_a.indexOf(apollonHead[i])>=0 ) hide_cls+=' hidden-sm';
				    		if ( col_b.indexOf(apollonHead[i])>=0 ) hide_cls+=' hidden-md';
		    				if ( aplnheadshow.indexOf(apollonHead[i])>=0 ) cod += '<th class="column100 column'+nbr+cls+hide_cls+'" data-column="column'+nbr+'" scope="col">'+apollonHead[i]+'</th>';
		    			}
		    			cod+='</tr></thead><tfoot><tr class="row100 foot">';
						var nbr=0, col_a = a.hide_sm, col_b = a.hide_md;
		    			for (var i = 0; i < apollonHead.length; i++) {
		    				nbr=i+1;
		    				var cls = '';
		    				if (apollonHead[i]==sortcol) {if (coldirect==0) cls = ' tobot'; else cls = ' totop'}
			       			hide_cls = '';
				    		if ( col_a.indexOf(apollonHead[i])>=0 ) hide_cls+=' hidden-sm';
				    		if ( col_b.indexOf(apollonHead[i])>=0 ) hide_cls+=' hidden-md';
		    				if ( aplnheadshow.indexOf(apollonHead[i])>=0 ) cod += '<th class="column100 column'+nbr+cls+hide_cls+'" data-column="column'+nbr+'" scope="col">'+apollonHead[i]+'</th>';
		    			}
		    			cod+='</tr></tfoot><tbody></tbody></table>';
		    			$('#'+_this+'-allContent').html(cod);
		    			if (apollon.length > 0) {
			    			cod = '';
			    			nbr=0;
			    			var lastitem = (toitem<allitems) ? toitem : allitems, 
			    				tolist = a.tolist, 
			    				toimg = a.toimg, 
			    				trufalse = a.trufalse, 
			    				action = a.action;

			    			for (var i = firstitem; i < toitem; i++) {
			    				var tbl = apollon[i];

			    				cod += '<tr class="row100"'+((tbl?.['color'] !== undefined)?' data-color="'+tbl['color']+'"':'')+((tbl?.['ID'] !== undefined)?' data-id="'+tbl['ID']+'"':'')+'>';
			    				for (var j = 0; j < apollonHead.length; j++) {
			    					nbr=j+1;
			    					var val = tbl?.[apollonHead[j]];

					       			hide_cls = '';
						    		if ( col_a.indexOf(apollonHead[j])>=0 ) hide_cls+=' hidden-sm';
						    		if ( col_b.indexOf(apollonHead[j])>=0 ) hide_cls+=' hidden-md';

						    		if ( aplnheadshow.indexOf(apollonHead[j])>=0  && val !== undefined) {
				    					cod += '<td class="column100 column'+nbr+hide_cls+'" data-column="column'+nbr+'" data-label="'+apollonHead[j]+'">';

							    		if ( action.indexOf(apollonHead[j])>=0 ) {
							    			if (val===undefined) {
				    							var x=val;
					    						cod += '<a id="'+x['id']+'" href="javascript:'+x['click']+';" class="apollonbtn btn-'+x['color']+'">'+x['content']+'</a>';
							    			} else {
					    						for (var n=0;n<val.length;n++) {
					    							var x=val[n];
					    							if (x?.['tooltip']!==undefined) cod += '<a id="'+x['id']+'-'+x['toolid']+'" data-url="sources/ajax/load/'+x['tooltip']+'.php" data-id="'+x['toolid']+'" data-val="0" href="'+x['click']+'" target="_blank" class="apollonbtn btn-'+x['color']+' tooltipster">'+x['content']+'</a>';
						    						else cod += '<a id="'+x['id']+'" href="javascript:'+x['click']+';" class="apollonbtn btn-'+x['color']+'">'+x['content']+'</a>';
					    						}
							    			}
							    		} else if (tolist.indexOf(apollonHead[j])>=0) {
							    			cod += '<ul class="'+_this+'-list">';
				    						for (var n=0;n<val.length;n++) {
				    							var x=val[n];
					    						cod += '<li>'+x+'</li>';
				    						}
							    			cod += '</ul>';
							    		} else if (toimg.indexOf(apollonHead[j])>=0) {

							    			var img_src = (val?.['src'] !== 'undefined') ? ' src="'+val['src']+'"' : '', 
							    				img_alt = (val?.['alt'] !== 'undefined') ? ' alt="'+val['alt']+'"' : '', 
							    				img_idd = (val?.['id'] !== 'undefined') ? ' id="'+val['id']+'"' : '', 
							    				img_cls = (val?.['class'] !== 'undefined') ? ' class="'+val['class']+' '+_this+'-image"' : ' class="'+_this+'-image"';

				    						cod += '<img'+img_src+img_alt+img_idd+img_cls+' />';

							    		} else if (trufalse.indexOf(apollonHead[j])>=0) {
							    			cod += (val===true) ? '<i class="apollon-ok-circled"></i>' : '<i class="apollon-circle-empty"></i>';
							    		}
							    		/* else if (action.indexOf(apollonHead[j])>=0) {
							    		}*/
							    		 else  {

				    						/*if (searchval.length>0) {
				    							var searchvalreg = new RegExp(searchval, "gi");
												if (val !== null && val !== 0 && typeof(val) !== 'undefined') {
													alert(val);
													alert(searchval);
													val=val.replace(searchvalreg, "<b class=\"searchword\">"+searchval.toUpperCase()+"</b>");
				    							} else val = '';
				    						}*/
											cod += val;

				    					}
				    					cod += '</td>';
						    		}
			    				}
			    				cod += '</tr>';
			    			}
			    			$('#'+_this+'-allContent table tbody').html(cod);
			    			$('#'+_this+'-txt3').html(lng['show_2']+' '+firstitem+' '+lng['tooo_1']+' '+lastitem+' '+lng['ooof_1']+' '+allitems+' '+lng['line_2']);

		    			} else {
		    				var colnbr = $('#'+_this+'-allContent table thead tr th').length;
		    				cod = '<tr class="row100"><td class="column100 column1" data-column="column1" colspan="'+colnbr+'">'+lng['nodata']+'</td></td>';
		    				$('#'+_this+'-allContent table tbody').html(cod);
		    				$('#'+_this+'-txt3').html(lng['nodata']);
		    				$('#'+_this+' tbody').html(cod);
		    			}
					}
					$('#'+_this+'-allContent').css({'height':'auto'});
					$('#'+_this+'-filters').addClass('hidden');
					setPagination(_this);
    				var hs=$('#'+_this+'apollon-sidebar').height(), 
    					ht=$('#'+_this+'-allContent').height();
    				if (hs>=ht) $('#'+_this+'-allContent').css({'height':hs+'px'});
	    					else $('#'+_this+'-allContent').css({'height':'auto'});
	    		},
	    		setPagination = function(_this) {
				    var pg_a=1, pg_b=1, pg_lst=allpages-2, pgx = [1,1,2,3,9,10,12], pagination=a.pagination;
				    if (allpages<6) {pg_a=1;pg_b=allpages;}
				        else if (pageact<5) {pg_a=1;pg_b=5;}
				            else if (pageact>=pg_lst) {pg_a=allpages-4; pg_b=allpages;}
				                else {pg_a=pageact-2; pg_b=pageact+2;}

				    var txt='<div class="pagination p'+pgx[pagination]+'"><ul>';
				    for (var i=pg_a; i<=pg_b; i++) {
				        txt+='<a'+((i==pageact)?' class="is-active"':'')+' href="javascript:;" name="'+i+'">'+i+'</a>';
				    }
				    txt+='</ul></div>';
				    if (allpages==1) txt='';
				    $('#'+_this+'-txt4').html(txt);
	    			events(_this);
	    		},
	    		getPagination = function(_this, c, m) {},
	    		ajaxload = function(_this) {
	    			var filters=a.filters, fltr_ex=(filters.length>0)?true:false;
	    			if (fltr_ex) for (var i = 0; i < filters.length; i++) filter_list[filters[i]]=[];
					$.post(a.ajaxurl, a.data, function(r) {
						if (/^{.*}$/.test(r)) {
							r = JSON.parse(r);
		                    if (typeof(r)=="object") {
		                    	var data = r.data;
	                    		apollon_all = r.data;
	                    		for (var i=0; i < apollon_all.length; i++) {
	                    			var x = apollon_all[i];
                    				if (fltr_ex) {
						    			for (var k = 0; k < apollonHead.length; k++) {
						    				if (filters.indexOf(apollonHead[k])>-1) {
						    					if (filter_list[apollonHead[k]].indexOf(x[apollonHead[k]])<0) filter_list[apollonHead[k]].push(x[apollonHead[k]]);
						    				}
						    			}
					    			}
	                    		}
		                    	apollon = apollon_all;
		                    	var tt_val = apollon_all;
					    		var th = $(this).find('thead tr th');
					    		for (var i = 0; i < th.length; i++) apollonHead.push($(th[i]).html());
						    	allitems = apollon_all.length;
						    	allpages = Math.ceil(allitems/nbrperpage);
								pageact = 1;
								firstitem = 0;
								toitem = (allitems>nbrperpage) ? nbrperpage : allitems ;
					    		setContent(_this);
					    		var callbackAjax = a.callbackAjax;
					    		callbackAjax(apollon_all);
						    }
						}
					});
	    		},
	    		print = function(_this) {
	    			if (modeofshowlt==0) listable(_this);
		            var printWindow = window.open('', '', 'height=400,width=600');
		            printWindow.document.write('<html><head><title>Apollon</title>');

		            //Print the Table CSS.
		            printWindow.document.write('<style type = "text/css">');
		            printWindow.document.write('body{font-family: Arial;font-size: 10pt;}table{border: 1px solid #ccc;border-collapse: collapse;}table th{background-color: #F7F7F7;color: #333;font-weight: bold;}table th, table td{padding: 5px;border: 1px solid #ccc;}');
		            printWindow.document.write('</style>');
		            printWindow.document.write('</head>');

		            //Print the DIV contents ie. the HTML Table.
		            printWindow.document.write('<body>');
		            var divContents = document.getElementById(_this+'table').innerHTML;
		            printWindow.document.write('<table cellspacing="0" rules="all" border="1">'+divContents+'</table>');
		            printWindow.document.write('</body>');

		            printWindow.document.write('</html>');
		            printWindow.document.close();
		            printWindow.print();
	    		},
	    		exportCSV = function(_this) {
	    			if (modeofshowlt==0) listable(_this);
	    			if(!(jQuery().tableExport)) {showMsg(lng['noexport'])} else {
	    				$('#'+_this+'table').tableExport({type:'csv', csvSeparator: ';', displayTableName:true, fileName:a.tableName});
	    			}
	    		},
	    		exportExcel = function(_this) {
	    			if (modeofshowlt==0) listable(_this);
	    			if(!(jQuery().tableExport)) {showMsg(lng['noexport'])} else {
	    				$('#'+_this+'table').tableExport({
	    					type:'excel',displayTableName:true, fileName:a.tableName, 
	                        mso: {fileFormat:'xlsxhtml'}
	    				});
	    			}
	    		},
	    		exportXML = function(_this) {
	    			if (modeofshowlt==0) listable(_this);
	    			if(!(jQuery().tableExport)) {showMsg(lng['noexport'])} else {
	    				$('#'+_this+'table').tableExport({type:'excel',displayTableName:true, fileName:a.tableName, 
	                        mso: {fileFormat:'xmlss',
	                            worksheetName: ['TomyTable','Table 2', 'Table 3']
	                        }
	                    });
	    			}
	    		},
	    		exportPDF = function(_this) {
	    			if (modeofshowlt==0) listable(_this);
	    			if(!(jQuery().tableExport)) {showMsg(lng['noexport'])} else {
						$('#'+_this+'table').tableExport({type:'pdf',displayTableName:true, fileName:a.tableName, 
						   jspdf: {
						   		orientation: 'l',
						        format: 'a4',
						        margins: {left:10, right:10, top:20, bottom:20},
						        autotable: {styles: {fillColor: 'inherit', textColor: 'inherit'},
					            tableWidth: 'auto'}
						    }
						  });
	    			}
	    		},
	    		exportSQL = function(_this) {
	    			if (modeofshowlt==0) listable(_this);
	    			if(!(jQuery().tableExport)) {showMsg(lng['noexport'])} else {
	    				$('#'+_this+'table').tableExport({type:'sql', displayTableName:true, fileName:a.tableName});
	    			}
	    		},
	    		showMsg = function(msg) {
    				var el=$('#'+_this+'-filters');
    				el.removeClass('hidden');
	    			var cod='<div class="alert alert-danger"><strong>'+lng['error']+'</strong> '+msg+'</div>';
	    			el.html(cod);
	    		},
	    		parseDt = function(dat, format) {
	    			if (typeof dat===undefined) {retdat=0;}
	    			else if (typeof dat === 'number') dat=retdat; else {
		    			var retdat='', 
		    				dateRegb = /^(\d{2})[./-](\d{2})[./-](\d{4})$/, 
							dateRega = /^(\d{2})[./-](\d{2})[./-](\d{4}) (\d{2}):(\d{2})$/, 
		    				dateRegc = /^(\d{4})[./-](\d{2})[./-](\d{2})$/, 
							dateRegd = /^(\d{4})[./-](\d{2})[./-](\d{2}) (\d{2}):(\d{2})$/;
						if (format=='m/d/y' || format=='m/d/y h:i') retdat=dat;
						else if (format=='d/m/y' || format=='d/m/y h:i') {
		    				if (format=='d/m/y') retdat = dat.replace(dateRegb, '$2/$1/$3');
		    				if (format=='d/m/y h:i') retdat = dat.replace(dateRega, '$2/$1/$3 $4:$5');
						}
						else if (format=='y/m/d' || format=='y/m/d h:i') {
		    				if (format=='y/m/d') retdat = dat.replace(dateRegc, '$2/$3/$1');
		    				if (format=='y/m/d h:i') retdat = dat.replace(dateRegd, '$2/$3/$1 $4:$5');
						}
						else if (format=='y/d/m' || format=='y/d/m h:i') {
		    				if (format=='y/d/m') retdat = dat.replace(dateRegc, '$3/$2/$1');
		    				if (format=='y/d/m h:i') retdat = dat.replace(dateRegd, '$3/$2/$1 $4:$5');
						}
						if (dateRegb.test(retdat) || dateRega.test(retdat)) retdat = Date.parse(retdat);
							else retdat=0;
	    			}
					return retdat;
	    		}, 
	    		what2show = function(_this) {
	    			if (numericexist==1) {
	    				var el=$('#'+_this+'-filters');
	    				el.removeClass('hidden');

		    			var cod='<div class="col-md-12 col-sm-12 text-center" id="'+_this+'-insertContent"></div><div class="col-md-3 col-sm-12"><label>'+lng['column']+'<br/><select class="custom-select custom-select-sm form-control form-control-sm" id="'+_this+'-insertContent-1">';
		    			for (var i = 0; i < apollonHead.length; i++) {
		    				nbr=i+1;
		    				if (apollonHead[i]==sortcol) {if (coldirect==0) cls = ' tobot'; else cls = ' totop'}
		    				cod+='<option value="'+apollonHead[i]+'">'+apollonHead[i]+'</option>';
		    			}
		    			cod+='</select></label></div><div class="col-md-3 col-sm-12"><label>'+lng['operation']+'<br><select class="custom-select custom-select-sm form-control form-control-sm" id="'+_this+'-insertContent-2"><option value="0">=</option><option value="1">&gt;</option><option value="2">&gt;=</option><option value="3">&lt;</option><option value="4">&lt;=</option><option value="5">!=</option></select></label></div><div class="col-md-3 col-sm-12"><label>'+lng['value']+'<br><input type="text" id="'+_this+'-insertContent-3" class="form-control form-control-sm" placeholder="'+lng['value']+'"></label></div><div class="col-md-3 col-sm-12 text-right"><button type="button" class="btn btn-primary" id="insertContent-btn">'+lng['show']+'</button></div><hr/>';
		    			el.html(cod);

				    	if((jQuery().chosen)) $('#'+_this+'-insertContent-1, #'+_this+'-insertContent-2').chosen({width:'100%'});

		    			$('#insertContent-btn').unbind('click').click(function() {
		    				el.addClass('hidden');
		    				var col=$('#'+_this+'-insertContent-1').val(), 
		    					opr=parseInt($('#'+_this+'-insertContent-2').val()), 
		    					vlx=$('#'+_this+'-insertContent-3').val();

			    			apollon = [];
			    			allitems = apollon_all.length;
							var datetype=a.datetype, timetype=a.timetype, dateformat=a.dateformat, nbr_found = 0;
			    			for (var i = 0; i < allitems; i++) {
			    				var tbl = apollon_all[i], line = '';
			    				for (var j = 0; j < apollonHead.length; j++) {
			    					if (apollonHead[j]==col) {
			    						var val = tbl[apollonHead[j]];
				    					if (specialsort.indexOf(apollonHead[j])>=0) val=tbl['sort_'+apollonHead[j]];
				    					if (datetype.indexOf(apollonHead[j])>=0) {
				    						val=parseDt(val, dateformat);
				    						vlx=parseDt(vlx, dateformat);
				    					}
				    					if (timetype.indexOf(apollonHead[j])>=0) {
				    						val=Date.parse('01/01/1970 '+val);
				    						vlx=Date.parse('01/01/1970 '+vlx);
				    					}
				    					if (sortnbr.indexOf(apollonHead[j])>=0) {
											val = val?.toString() || val;
											val = val?.replace(' ', '') || val;
											val = (typeof(val)==='string') ? val.replace(/<\/?[^>]+(>|$)/g,""):val;
				    						val = parseFloat(val);
											vlx = vlx?.toString() || vlx;
											vlx = vlx?.replace(' ', '') || vlx;
											vlx = (typeof(vlx)==='string') ? vlx.replace(/<\/?[^>]+(>|$)/g,""):vlx;
				    						vlx = parseFloat(vlx);
				    					}
			    						if ((opr==0 && val==vlx) || (opr==1 && val>vlx) || (opr==2 && val>=vlx) || (opr==3 && val<vlx) || (opr==4 && val<=vlx) || (opr==5 && val!=vlx)) {
			    							apollon.push(apollon_all[i]);
											nbr_found++;
			    						}
			    					}
			    				}
			    			}
		    				allitems = nbr_found;
		    				allpages = Math.ceil(allitems/nbrperpage);
		    				pageact = 1;
		    				firstitem = 0;
			    			toitem=firstitem + parseInt(nbrperpage);
			    			if (toitem>allitems) toitem=allitems;
			    			createIntCont(_this);
		    			});
	    			}
	    		},
	    		setFilterzsel = function(_this) {
    				var el=$('#'+_this+'-filters'), cod='', colz='';
    				el.removeClass('hidden');
	    			for (var i = 0; i < apollonHead.length; i++) colz+='<option value="'+apollonHead[i]+'">'+apollonHead[i]+'</option>';

    				// Dynamic filter
	    			cod+='<div class="col-md-12 col-sm-12 text-center" id="'+_this+'-insertContent"></div><div class="col-md-2 col-sm-12"></div>';
	    			cod+='<div class="col-md-5 col-sm-12"><label>'+lng['column']+'<br/><select class="custom-select custom-select-sm form-control form-control-sm" multiple id="'+_this+'-insertContent-1">'+colz+'</select></label></div>';
	    			cod+='<div class="col-md-2 col-sm-12"></div><div class="col-md-3 col-sm-12 text-right"><button type="button" class="btn btn-primary" id="insertContent-btn">'+lng['show']+'</button></div><hr/>';
	    			el.html(cod);

	    			if((jQuery().chosen)) $('#'+_this+'-insertContent-1').chosen({width:'100%'});

	    			$('#insertContent-btn').unbind('click').click(function() {
	    				el.addClass('hidden');
	    				var col=$('#'+_this+'-insertContent-1').val();
	    				a.filters = col;

		    			filter_list = {};
		    			for (var k = 0; k < col.length; k++) filter_list[col[k]]=[];
		    			allitems = apollon_all.length;
		    			var nbr_found = {}, found=0;
	            		for (var i=0; i < apollon_all.length; i++) {
	            			var x = apollon_all[i];
			    			for (var k = 0; k < col.length; k++) {
			    				if (filter_list[col[k]].indexOf(x[col[k]])<0) {
			    					filter_list[col[k]].push(x[col[k]]);
			    					nbr_found[col[k]]=nbr_found[col[k]]+1;
			    				}
			    			}
	            		}

	            		setContent(_this);
	    			});
	    		},
	    		drawgraph = function(_this) {
	    			if (numericexist==1) {
	    				var el=$('#'+_this+'-filters');
	    				el.removeClass('hidden');
		    			var code_ckeck_1 = '', code_ckeck_2 = '', cod='';
		    			for (var i = 0; i < numericcolon.length; i++) code_ckeck_1 += '<option value="'+numericcolon[i]+'">'+numericcolon[i]+'</option>';
		    			for (var i = 0; i < apollonHead.length; i++) code_ckeck_2 += '<option value="'+apollonHead[i]+'">'+apollonHead[i]+'</option>';
		    				code_ckeck_1 += '<option value="count">'+lng['count']+'</option>';

		    			cod+='<div class="col-md-12 col-sm-12 text-center" id="'+_this+'-insertContentsta"></div>';
		    			cod+='<div class="col-md-3 col-sm-12"><label>'+lng['abscis']+'<br/><select class="custom-select custom-select-sm form-control form-control-sm" id="'+_this+'-drawgraph-1">'+code_ckeck_2+'</select></label></div>';
		    			cod+='<div class="col-md-3 col-sm-12"><label>'+lng['coordo']+'<br><select class="custom-select custom-select-sm form-control form-control-sm" id="'+_this+'-drawgraph-2" multiple>'+code_ckeck_1+'</select></label></div>';
		    			cod+='<div class="col-md-3 col-sm-12"><label>'+lng['typ']+'<br><select class="custom-select custom-select-sm form-control form-control-sm" id="'+_this+'-drawgraph-3">\<option value="0">'+lng['points']+'</option><option value="1">'+lng['lines']+'</option><option value="2">'+lng['lines_bg']+'</option><option value="3">'+lng['lines_step']+'</option><option value="4">'+lng['bars']+'</option></select></label></div>';
		    			cod+='<div class="col-md-3 col-sm-12 text-right"><button type="button" class="btn btn-primary" id="drawgraph-btn">'+lng['draw']+'</button></div><hr/>';
		    			el.html(cod);

		    			if((jQuery().chosen)) $('#'+_this+'-drawgraph-1, #'+_this+'-drawgraph-2, #'+_this+'-drawgraph-3').chosen({width:'100%'});

		    			$('#drawgraph-btn').unbind('click').click(function() {
		    				var abs=$('#'+_this+'-drawgraph-1').val(), 
		    					cor=$('#'+_this+'-drawgraph-2').val(), 
		    					typ=$('#'+_this+'-drawgraph-3').val();

			    			if (cor!==null) {
			    				$('#'+_this+'-insertContentsta').html('<div class="drawgraph-flot-prnt"><div id="drawgraph-flot" class="drawgraph-flot"></div></div>');

				    			var abscis=[],  coordo=[],  coordovals=[], mino=0, maxo=0, idx, datx={}, daty=[];
				    			if (cor?.[0]=='count') {
				    				for (var i = 0; i < allitems; i++) {
				    					for (var j = 0; j < apollonHead.length; j++) {
					    					var tbl = apollon[i];
					    					if ( apollonHead[j]==abs ) {
												var valx = tbl[apollonHead[j]];
												valx = (typeof(valx) === 'string') ? valx.replace(/<\/?[^>]+(>|$)/g, "") : valx;
					    						if (daty.indexOf(valx)>-1) {
					    							datx[valx]=datx[valx]+1;
					    						} else {
					    							daty.push(valx);
					    							datx[valx]=1;
					    						}
					    					}
				    					}
				    				}
				    				var i=0, vlx;
				    				for (var k in datx) {
				    					vlx=datx[k];
			    						abscis.push([i, k]);
		    							coordovals.push([i, vlx]);
			    						if (vlx>maxo) maxo=vlx+vlx*.2;
			    						i++;
					    			}
					    			coordo.push({ label: abs, data: coordovals });
				    			} else {
				    				for (var i = 0; i < allitems; i++) {
				    					var tbl = apollon[i];
				    					for (var j = 0; j < apollonHead.length; j++) {
				    						var val = tbl[apollonHead[j]];
				    						if ( apollonHead[j]==abs ) {
												var valx = tbl[apollonHead[j]];
												valx = (typeof(valx) === 'string') ? valx.replace(/<\/?[^>]+(>|$)/g, "") : valx;
				    							abscis.push([i, valx]);
				    						}
				    						if ( cor.indexOf(apollonHead[j])>=0 ) {
				    							if (coordovals?.[j]===undefined) coordovals[j]=[];
					    						if (specialsort.indexOf(apollonHead[j])>=0) val = tbl['sort_'+apollonHead[j]];
												val = val?.toString() || val;
												val = val?.replace(' ', '') || val;
												val = (typeof(val) === 'string') ? val.replace(/<\/?[^>]+(>|$)/g, "") : val;
												val = parseFloat(val);
				    							coordovals[j].push([i, val]);
					    						if (val>maxo) maxo=val+val*.2;
					    						if (mino==0) mino=val; else if (val<mino) mino=val-val*.2;
				    						}
				    					}
					    			}
				    			}
		    					for (var j = 0; j < apollonHead.length; j++) {
		    						if ( cor.indexOf(apollonHead[j])>=0 ) {
		    							coordo.push({ label: apollonHead[j], data: coordovals[j] });
		    						}
		    					}

								var typs = [{points: { show: true }}, 
								{points: { show: true }, lines: { show: true }}, 
								{points: { show: true }, lines: { show: true, fill: true }}, 
								{lines: { show: true, steps: true, fill: true }}, 
								{bars: { show: true }}];
								$.plot("#drawgraph-flot", coordo, {
									series: typs[typ],
									xaxis: {ticks: abscis},
									yaxis: {min: mino, max: maxo}
								});

								$("<div id='apollontooltip'></div>").css({
									position: "absolute",
									display: "none",
									border: "1px solid #fdd",
									padding: "2px",
									"z-index": 9999999999,
									"background-color": "#fee",
									opacity: 0.80
								}).appendTo("body");

								$("#drawgraph-flot").bind("plothover", function (event, pos, item) {
									console.log(event, pos, item);
									if (item) {
										var x = item.datapoint[0].toFixed(2),
											y = item.datapoint[1].toFixed(2);

										$("#apollontooltip").html(item.series.label + ": " + x + " = " + y)
											.css({top: item.pageY+5, left: item.pageX+5})
											.fadeIn(200);
									} else {
										$("#apollontooltip").hide();
									}
								});
		    				}
		    			});
		    		}
	    		},
	    		listable = function(_this) {
	    			modeofshowlt = 1 - modeofshowlt;
	    			var btn = '';
	    			if (modeofshowlt==0) btn = '<i class="apollon-table"></i> '+lng['tablemod'];
	    				else btn = '<i class="apollon-list-bullet"></i> '+lng['listmod'];

	    			$('#'+_this+'-listable').html(btn);
					if (typeof(Storage) !== "undefined") {
						var tblck_s='apollontable_'+tableID+'_s';
						window.localStorage.setItem(tblck_s, modeofshowlt);
					}
		    		createIntCont( _this );
	    		},
	    		funcStat = function(_this) {
	    			if (numericexist==1) {
	    				var dt_nbr=0, dt_val, dat_x={'sum':{},'avg':{},'max':{},'min':{},'ext':{},'nbr':{},'q1':{},'q2':{},'q3':{},'iqr':{}}, lin, data_z={},
	    					dt_nm = {'sum':lng['sum'],'avg':lng['avg'],'max':lng['max'],'min':lng['min'],'nbr':lng['nbr'],'ext':lng['ext'],'q1':lng['q1'],'q2':lng['q2'],'q3':lng['q3'],'iqr':lng['iqr']};
	    				var el=$('#'+_this+'-filters');
	    				el.removeClass('hidden');

	    				// Dynamic filter
		    			var cod='<div class="col-md-12 col-sm-12 text-center" id="tomytable-insertContent"><table class="result-table"><thead><tr><th scope="col">-</th>';
		    			for (var i = 0; i < numericcolon.length; i++) {
		    				cod+='<th scope="col">'+numericcolon[i]+'</th>';
		    				dat_x['sum'][numericcolon[i]]=0;
		    				dat_x['avg'][numericcolon[i]]=0;
		    				dat_x['max'][numericcolon[i]]=0;
		    				dat_x['ext'][numericcolon[i]]=0;
		    				dat_x['min'][numericcolon[i]]=null;
		    				data_z[numericcolon[i]]=[];
		    				dat_x['q1'][numericcolon[i]]=null;
		    				dat_x['q2'][numericcolon[i]]=null;
		    				dat_x['q3'][numericcolon[i]]=null;
		    				dat_x['iqr'][numericcolon[i]]=null;
		    			}
		    			cod+='</tr></thead><tbody>';
						for (var j = 0; j < apollon.length; j++) {
							dt_nbr++;
							for (var i = 0; i < numericcolon.length; i++) {
								dt_val = apollon[j][numericcolon[i]];
								if (specialsort.indexOf(apollonHead[j])>=0) dt_val = apollon[j]['sort_'+numericcolon[i]];
								dt_val = (typeof(dt_val) === 'string') ? dt_val.replace(/<\/?[^>]+(>|$)/g, "") : dt_val;
								dt_val = dt_val?.toString() || dt_val;
								dt_val = dt_val?.replace(' ', '') || dt_val;
								dt_val = parseFloat(dt_val);

								dat_x['nbr'][numericcolon[i]]=dt_nbr;
								dat_x['sum'][numericcolon[i]]+=dt_val;
								if (dt_val>dat_x['max'][numericcolon[i]]) dat_x['max'][numericcolon[i]]=dt_val;
								if (dt_nbr==1) {dat_x['min'][numericcolon[i]]=dt_val;}
									else if (dt_val<dat_x['min'][numericcolon[i]]) dat_x['min'][numericcolon[i]]=dt_val;
								data_z[numericcolon[i]].push(dt_val);
							}
						}
						var _q1=Math.ceil(dt_nbr/4)-1, _q3=Math.floor(dt_nbr*3/4)-1;
		    			for (var i = 0; i < numericcolon.length; i++) {
		    				var serie=data_z[numericcolon[i]];
		    				serie = serie.sort(function(a,b) { return a - b;});

		    				dat_x['ext'][numericcolon[i]]=parseFloat(dat_x['max'][numericcolon[i]])-parseFloat(dat_x['min'][numericcolon[i]]);
		    				dat_x['avg'][numericcolon[i]]=parseFloat(dat_x['sum'][numericcolon[i]])/dt_nbr;

		    				dat_x['q1'][numericcolon[i]]=parseFloat(serie[_q1]);
		    				dat_x['q3'][numericcolon[i]]=parseFloat(serie[_q3]);
		    				dat_x['iqr'][numericcolon[i]]=parseFloat(serie[_q3])-parseFloat(serie[_q1]);
		    				if (dt_nbr%2==1) {
		    					var _q2=(dt_nbr+1)/2-1;
		    					dat_x['q2'][numericcolon[i]]=parseFloat(serie[_q2]);
		    				} else {
		    					var _q21=dt_nbr/2-1, _q22=_q21+1;
		    					dat_x['q2'][numericcolon[i]]=(parseFloat(serie[_q21])+parseFloat(serie[_q22]))/2;
		    				}
		    			}
		    			for (z in dat_x) {
		    				lin = dat_x[z];
		    				cod+='<tr><th>'+dt_nm[z]+'</th>';
		    				for (var i = 0; i < numericcolon.length; i++) cod+='<td>'+((!isNaN(lin[numericcolon[i]]))?Math.round(lin[numericcolon[i]]*100)/100:'/')+'</td>';
		    				cod+='</tr>';
		    			}
						cod+='</tbody></table><hr/></div>';
		    			el.html(cod);
		    		}
	    		},
	    		getTable = function() {return apollon_all;}, 
	    		getFiltredTable = function() {return apollon;}, 
	    		getLine = function(id) {
	    			var line={}, lin;
	    			for (var i = 0; i < apollon_all.length; i++) {
	    				lin = apollon_all[i];
	    				if (lin?.['ID'] !== undefined && lin?.['ID'] == id) line=lin;
	    				if (lin?.['id'] !== undefined && lin?.['id'] == id) line=lin;
	    			}
	    			return line;
	    		}, 
	    		getColumn = function(id, col) {
	    			var line=null, lin;
	    			for (var i = 0; i < apollon_all.length; i++) {
	    				lin = apollon_all[i];
	    				if (lin?.['ID'] !== undefined && lin?.['ID'] == id) line=lin?.[col];
	    				if (lin?.['id'] !== undefined && lin?.['id'] == id) line=lin?.[col];
	    			}
	    			return line;
	    		}, 
	    		refresh = function() {
					if (a.datatype=='ajax') ajaxload(_this); else {
						apollon = apollon_all;
	    				allitems = apollon_all.length;
	    				allpages = Math.ceil(allitems/nbrperpage);
	    				pageact = 1;
	    				firstitem = 0;
	    				toitem = (allitems>nbrperpage) ? nbrperpage : allitems ;
						setContent(_this);
					}
	    		}, 
	    		editLine = function(id, line) {
	    			var lin, result=false;
	    			if (typeof id !== undefined && typeof line !== undefined) for (var i = 0; i < apollon_all.length; i++) {
	    				lin = apollon_all[i];
	    				if ((lin?.['ID'] !== undefined && lin?.['ID'] == id) || (lin?.['id'] !== undefined && lin?.['id'] == id)) {
	    					apollon_all[i]=line;
	    					result=true;
	    				}
	    			}
	    			return result;
	    		}, 
	    		addLine = function(line, refsh) {
	    			var added=true;
	    			if (typeof refsh === undefined) refsh=false;
	    			if (typeof line === undefined) added=false;
	    				else apollon_all.push(line);
	    			if (refsh===true) refresh();
	    			return added;
	    		}, 
	    		editColumn = function(id, col, val) {
	    			var lin, result=false;
	    			if (typeof id !== undefined && typeof col !== undefined && typeof val !== undefined) for (var i = 0; i < apollon_all.length; i++) {
	    				lin = apollon_all[i];
	    				if ((lin?.['ID'] !== undefined && lin?.['ID'] == id) || (lin?.['id'] !== undefined && lin?.['id'] == id)) {
	    					apollon_all[i][col]=val;
	    					result=true;
	    				}
	    			}
	    			return result;
	    		}, 
	    		removeLine = function(id) {
	    			var lin, tblx=[], result=false;
	    			for (var i = 0; i < apollon_all.length; i++) {
	    				lin = apollon_all[i];
	    				if ((lin?.['ID'] !== undefined && lin?.['ID'] != id) || (lin?.['id'] !== undefined && lin?.['id'] != id)) {
	    					tblx.push(apollon_all[i]);
	    					result=true;
	    				}
	    			}
	    			if (typeof id !== undefined) apollon_all=tblx;
	    			return result;
	    		}, 
	    		removeColumn = function(id, col) {
	    			var lin, result=false;
	    			if (typeof id !== undefined && typeof col !== undefined) for (var i = 0; i < apollon_all.length; i++) {
	    				lin = apollon_all[i];
	    				if ((lin?.['ID'] !== undefined && lin?.['ID'] == id) || (lin?.['id'] !== undefined && lin?.['id'] == id)) {
	    					if (sortnbr.indexOf(col)) apollon_all[i][col]=0;
	    						else apollon_all[i][col]='';
	    					result=true;
	    				}
	    			}
	    			return result;
	    		};

			// International use
			var lang=a.lang;
			if (typeof lng===undefined || lang=='en') lng=a.english; else lng=lng[lang];
			if (lang=='ar' || lang=='iw') $('head').append('<link rel="stylesheet" href="'+a.distloc+'css/rtl-apollon.min.css" type="text/css" />');

			/*==============
			// Columns to use
			====================*/
    		var columns=a.columns, tableID=a.tableID;
			if (columns.length>0) {
				apollonHead = columns;
				aplnheadshow = columns;
				aplnheadsrch = columns;
			} else {
	    		var th = $(this).find('thead tr th');
	    		for (var i = 0; i < th.length; i++) apollonHead.push($(th[i]).html());
				a.columns = apollonHead;
				aplnheadshow = apollonHead;
				aplnheadsrch = apollonHead;
			}

			// Sort
			var sortnbr=a.sortnbr, specialsort=a.specialsort;
			for (var i = 0; i < apollonHead.length; i++) {
				if ( sortnbr.indexOf(apollonHead[i])>=0 || specialsort.indexOf(apollonHead[i])>=0 ) numericcolon.push(apollonHead[i]);
			}
			if (numericcolon.length>0) numericexist=1;
			modeofshowlt = (a.showmode=='list' || a.showmode=='html') ? 0 : 1;

			/*==============
			// Load data
			====================*/
			// Set theme
	    	$(this).attr('data-vertable', a.theme);
    		$(this).parent().addClass(a.theme);

    		// HTML data
    		if (a.datatype=='html') {
	    		var cod = '<thead><tr class="row100 head"><th class="column100 column1" data-column="column1" scope="col">'+lng['loading']+'</th></tr></thead><tfoot><tr class="row100 foot"><th class="column100 column1" data-column="column1" scope="col">'+lng['loading']+'</th></tr></tfoot><tbody><tr><td>'+((a.loading==0)?'<div class="pdfifty"><div class="loading"><span>'+a.loadtxt+'</span></div></div>':'<div class="tt-loading-bg" name="'+loaders[a.loading]['color']+'"><div><img src="'+a.distloc+'svg-loaders/'+loaders[a.loading]['file']+'.svg" width="'+loaders[a.loading]['width']+'" alt=""></div></div>')+'</td></tr></tbody>';
	    		$('#'+_this).html(cod);
	    		var filters=a.filters, fltr_ex=(filters.length>0)?true:false, tr = $(this).find('tbody tr');
	    		if (fltr_ex) for (var i = 0; i < filters.length; i++) filter_list[filters[i]]=[];
	    		for (var i = 0; i < tr.length; i++) {
	    			var col = $(tr[i]).find('td'), 
	    				lin = {};
	    			for (var j = 0; j < col.length; j++) {
	    				lin[apollonHead[j]] = $(col[j]).html();
	    				lin[apollonHead[j]] = lin[apollonHead[j]].replace(/(\r\n|\n|\r| )/gm, "");
	    			}
	    			apollon.push(lin);
	    			apollon_all.push(lin);
	    			allitems++;
	    		}
	    		if (allitems<nbrperpage) {
	    			allpages=1;
	    			toitem=allitems;
	    		} else {
	    			allpages = Math.ceil(allitems/nbrperpage);
	    			toitem=nbrperpage;
	    		}
        		for (var i=0; i < apollon_all.length; i++) {
        			var x = apollon_all[i];
    				if (fltr_ex) {
		    			for (var k = 0; k < apollonHead.length; k++) {
		    				if (filters.indexOf(apollonHead[k])>-1) {
		    					if (filter_list[apollonHead[k]].indexOf(x[apollonHead[k]])<0) filter_list[apollonHead[k]].push(x[apollonHead[k]]);
		    				}
		    			}
	    			}
        		}
	    		setContent(_this);
	    		callback = a.callback;
	    		callback(apollon_all);
    		} else if (a.datatype=='js') {
	    		var cod = '<thead><tr class="row100 head"><th class="column100 column1" data-column="column1" scope="col">'+lng['loading']+'</th></tr></thead><tfoot><tr class="row100 foot"><th class="column100 column1" data-column="column1" scope="col">'+lng['loading']+'</th></tr></tfoot><tbody><tr><td>'+((a.loading==0)?'<div class="pdfifty"><div class="loading"><span>'+a.loadtxt+'</span></div></div>':'<div class="tt-loading-bg" name="'+loaders[a.loading]['color']+'"><div><img src="'+a.distloc+'svg-loaders/'+loaders[a.loading]['file']+'.svg" width="'+loaders[a.loading]['width']+'" alt=""></div></div>')+'</td></tr></tbody>';
	    		$('#'+_this).html(cod);
	    		var filters=a.filters, fltr_ex=(filters.length>0)?true:false;
	    		if (fltr_ex) for (var i = 0; i < filters.length; i++) filter_list[filters[i]]=[];
	    		apollon_all = a.data;
	    		apollon = a.data;
		    	allitems = apollon_all.length;
	    		if (allitems<nbrperpage) {
	    			allpages=1;
	    			toitem=allitems;
	    		} else {
	    			allpages = Math.ceil(allitems/nbrperpage);
	    			toitem=nbrperpage;
	    		}
        		for (var i=0; i < apollon_all.length; i++) {
        			var x = apollon_all[i];
    				if (fltr_ex) {
		    			for (var k = 0; k < apollonHead.length; k++) {
		    				if (filters.indexOf(apollonHead[k])>-1) {
		    					if (filter_list[apollonHead[k]].indexOf(x[apollonHead[k]])<0) filter_list[apollonHead[k]].push(x[apollonHead[k]]);
		    				}
		    			}
	    			}
        		}
	    		setContent(_this);
	    		callback = a.callback;
	    		callback(apollon_all);
    		} else if (a.datatype=='ajax') {
	    		var cod = '<thead><tr class="row100 head"><th class="column100 column1" data-column="column1" scope="col">'+lng['loading']+'</th></tr></thead><tfoot><tr class="row100 foot"><th class="column100 column1" data-column="column1" scope="col">'+lng['loading']+'</th></tr></tfoot><tbody><tr><td>'+((a.loading==0)?'<div class="pdfifty"><div class="loading"><span>'+a.loadtxt+'</span></div></div>':'<div class="tt-loading-bg" name="'+loaders[a.loading]['color']+'"><div><img src="'+a.distloc+'svg-loaders/'+loaders[a.loading]['file']+'.svg" width="'+loaders[a.loading]['width']+'" alt=""></div></div>')+'</td></tr></tbody>';
	    		$('#'+_this).html(cod);
		    	ajaxload(_this);
    		} else {
	    		var cod = '<thead><tr class="row100 head"><th class="column100 column1" data-column="column1" scope="col">'+lng['loading']+'</th></tr></thead><tfoot><tr class="row100 foot"><th class="column100 column1" data-column="column1" scope="col">'+lng['loading']+'</th></tr></tfoot><tbody><tr><td>'+((a.loading==0)?'<div class="pdfifty"><div class="loading"><span>'+a.loadtxt+'</span></div></div>':'<div class="tt-loading-bg" name="'+loaders[a.loading]['color']+'"><div><img src="'+a.distloc+'svg-loaders/'+loaders[a.loading]['file']+'.svg" width="'+loaders[a.loading]['width']+'" alt=""></div></div>')+'</td></tr></tbody>';
	    		$('#'+_this).html(cod);
	    		apollon_all = [];
	    		apollon = [];
		    	apollonHead = [];
		    	allpages = 0;
		    	pageact = 1;
		    	nbrperpage = 10;
		    	allitems = 0;
		    	firstitem = 0;
		    	toitem = 0;
		    	sortcol = 0;
		    	coldirect = 0;
		    	searchval = '';
	    		setContent(_this);
	    		callback = a.callback;
	    		callback(apollon_all);
    		}

			// Show mode
			if (typeof(Storage) !== "undefined") {
				var tblck_s='apollontable_'+tableID+'_s';
				modeofshowlt = window.localStorage.getItem(tblck_s);
				var tblck_o='apollontable_'+tableID+'_o';
				coldirect = window.localStorage.getItem(tblck_o);
				var tblck_c='apollontable_'+tableID+'_c';
				sortcol = window.localStorage.getItem(tblck_c);
				var tblck_n='apollontable_'+tableID+'_n';
				nbrperpage = window.localStorage.getItem(tblck_n);
				var toshow=a.toshow;
				if (!nbrperpage) nbrperpage=toshow[0];
				var tblck_r='apollontable_'+tableID+'_r';
				searchval = window.localStorage.getItem(tblck_r);
				var tblck_p='apollontable_'+tableID+'_p';
				pageact = window.localStorage.getItem(tblck_p);
				if (!pageact) pageact=1;
			}

			/*==============
			// Internal function
			====================*/
			// Get all the table
			this.getTable = function() {return getTable()};
			// Get the filtred table
			this.getFiltredTable = function() {return getFiltredTable()};
			// Get a line
			this.getLine = function(id) {return getLine(id)};
			// Get a coumn
			this.getColumn = function(id, col) {return getColumn(id, col)};

			// Refresh the table
			this.refresh = function() {refresh()};
			// Update a line
			this.editLine = function(id, line) {return editLine(id, line)};
			// Add a line
			this.addLine = function(line, refsh) {return addLine(line, refsh)};
			// Update a column
			this.editColumn = function(id, col, val) {return editColumn(id, col, val)};

			// Remove a line
			this.removeLine = function(id) {return removeLine(id)};
			// Remove a column
			this.removeColumn = function(id, col) {return removeColumn(id, col)};
			// Set the filter fltr to value fltr_val
			this.setFilter = function(fltr, fltr_val) {setFilter(fltr, fltr_val)}

			// Sort the table
			this.xsort = function(colo, ord) {xsort(_this, colo, ord)};
			});
	    };
	})(jQuery);
} else console.error('>> jQuery.js is required to use ApollonJS !! <<');