var app = app || {}
app = (()=>{
	let _, js
	let init =()=>{
		_ = $.ctx()
		js = $.js()
	}
	let run =x=>{
		$.when(
			$.getScript(x+'/resources/js/router.js', ()=>{
				$.extend(new Session(x))
			}),
			$.getScript(x+'/resources/js/pop.js')
		)
		.done(()=>{
			init()
			onCreate()
		})
		.fail(()=>{
			alert('fail')
		})
		
	}
	let onCreate =()=>{
		$(pop.view()).appendTo('#wrapper')
		pop.open()
		setContentView()
	}
	let setContentView =()=>{
		$('body')
		.css({
			'background-image' : 'url("resources/img/a.jpg")',
			'background-repeat' : 'no-repeat',
			'background-position' : 'center',
			'background-size' : 'cover'
		})
		$('<table id="tab"><tr></tr></table>')
		.css({
			width : '80%',
			height : '800px',
			border : '1px solid white',
			'margin-top' : '10px',
			'margin-left' : '190px'
		})
		.appendTo('#wrapper')
		$('<td/>',{id : 'left'})
		.css({
			width : '20%',
			height : '100%',
			border : '1px solid white',
			'vertical-align' : 'top'
		})
		.appendTo('tr')
		$('<td/>',{id : 'right'})
		.css({
			width : '80%',
			height : '100%',
			border : '1px solid white'
		})
		.appendTo('tr')
		$.each(['NAVER', 'CGV', 'BUGS'],(i,j)=>{
			$('<div/>')
			.text(j)
			.css({
				width : '100%',
				height : '50px',
				border : '1px solid white',
				color : 'white',
				'text-align' : 'center',
				'vertical-align' : 'middle',
			    '-webkit-text-emphasis' : 'triangle'
			})
			.appendTo('#left')
			.click(function(){
				alert($(this).text()+'클릭')
				$(this).css({'background-color':'navy'})
				$(this).siblings().css({'background-color':'unset'})
				_ = $.ctx()
				switch ($(this).text()) {
				case 'NAVER':
					$('#right').empty()
					$.getJSON(_+'/crawls/naver',d=>{
						$.each(d, (i,j)=>{
							$('<div/>')
							.css({
								width : '49.5%',
								height : '49.5%',
								border : '3px solid white',
								float : 'left',
								color : 'white',
							    'text-align' : 'center',
							    'text-transform' : 'uppercase'
								})
								.html('<h1>'+j.origin+'</h1><h4>'+j.trans+'</h4>')
								.appendTo('#right')
						})
					})
					break
				case 'CGV':
					$('#right').empty()
					$.getJSON(_+'/crawls/cgv',d=>{
						$.each(d, (i,j)=>{
							$('<div><h3>'+j.title+'</h3><img style="width:200px" src="'+j.photo+'"/><br/>'+j.textInfo+'<br/>'+j.precent+'<br/></div>')
							.css({
								border : '3px solid white',
								float : 'left',
								color : 'white',
								 'text-align' : 'center'
								})
								.appendTo('#right')
						})
					})
					break
				case 'BUGS':
					list(0)
					break
				}
			})
		})
	}
	let list =x=>{
		$.getJSON(_+'/crawls/bugs/page/'+x,d=>{
			let pager = d.pager
			let list = d.list
			
			$('#right').empty()
			
			$('<table id="content"><tr id="head"></tr></table>')
			.css({
				width : '99%',
				height : '50px',
				border : '1px solid white'
			})
			.appendTo('#right')
			$.each(['No.','제목','가수','앨범'],(i,j)=>{
				$('<th/>')
				.html('<b>'+j+'</b>')
				.css({
					width : '25%',
					height : '100%',
					border : '1px solid white',
					color : 'white',
					'text-align' : 'center'
				})
				.appendTo('#head')
			})
			$.each(list, (i,j)=>{
				$('<tr><td>'+j.seq+'</td><td><img src="'+j.thumbnail+'"/></td><td>'+j.artist+'</td><td>'+j.title+'</td></tr>')
				.css({
					width : '25%',
					height : '100%',
					border : '1px solid white',
					color : 'white',
					'text-align' : 'center'
				})
				.appendTo('#content tbody')
			})
			$('#content tr td').css({border : '1px solid white'})
			$('<div/>',{
				id : 'pagination'
			})
			.css({
				width : '50%',
				height : '50px',
				margin : '20px auto',
				'text-align' : 'center'})
			.appendTo('#right')
			if(pager.existPrev){
				$('<span/>')
				.css({
					width : '50px',
					height : '30px',
					display : 'inline-block',
					border : '1px solid white',
					color : 'white',
					'text-align' : 'center'})
				.text('PREV')
				.appendTo('#pagination')
				.click(()=>{
					app.list(pager.prevBlock)
				})
			}
			let i = pager.startPage
			for(;i<pager.endPage+1;i++){
				
				$('<span/>')
				.css({
					width : '30px',
					height : '30px',
					display : 'inline-block',
					border : '1px solid white',
					color : 'white'})
				.text(i+1)
				.appendTo('#pagination')
				.click(function(){
					$(this).css({'background-color':'navy'})
					$(this).siblings().css({'background-color':'unset'})
					let page = parseInt($(this).text())
					app.list(page-1)
				})
			}
			if(pager.existNext){
				$('<span/>')
				.css({
					width : '50px',
					height : '30px',
					display : 'inline-block',
					border : '1px solid white',
					color : 'white',
					'text-align' : 'center'})
				.text('NEXT')
				.appendTo('#pagination')
				.click(()=>{
					app.list(pager.nextBlock)
				})
			}
		})
	}
	return{run, list}
})()