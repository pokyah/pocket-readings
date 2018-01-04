// goes through all the tags and generates
// an array of the different tags used




		function existingTagsList(data) {
			var existingTags = [];
			data.forEach(function getTagArray(row) {
				if (row.tags === "") return;
				row.tags.forEach(function parseTags(tag) {
					var tagString = tag["tag"];
		      if (existingTags.length === 0) existingTags.push(tagString);
		      if (existingTags.indexOf(tagString) > -1) return;
		      existingTags.push(tagString);
		    });
		  });
		  existingTags.sort();
		  return existingTags;
		}

		// originally the tags are a string, this separates
		// them into their own objects which can be made
		// individual links in the html
		function separateTags(data) {
			data.forEach(function findMultiTags(article) {
				if (article.tags === "") return;
				if (article.tags.indexOf(',') >= 0) {
					var tagArray = parseTags(article.tags);
					var tagObjArray = arrayIntoObjects(tagArray);
					article.tags = tagObjArray;
				}
				else {
					article.tags = [{"tag": article.tags}];
				}
			});
		  return data;
		}

		// goes through the string tag and separates
		// them based on the comma
		function parseTags(bulkTags) {
			tagArray = bulkTags.split(', ');
			return tagArray;
		}

		// turns the array of strings into objects
		function arrayIntoObjects(array) {
		  var tags = [];
		  for (var i = 0; i < array.length; ++i)
		    if (array[i] !== undefined) tags.push({ "tag" : array[i]});
		  return tags;
		}

		// find articles that match a tag
		function getTagMatches(data, selectedTag) {
		  var matches = [];
		  data.forEach(function (element) {
		    var elTags = element.tags;
		    if (elTags === "") return;
		    elTagsArr = elTags.map(a => a.tag);
		    //https://stackoverflow.com/questions/8628059/check-if-every-element-in-one-array-is-in-a-second-array
		    var isSuperset = selectedTag.every(function(val) {
		      return elTagsArr.indexOf(val) >= 0;
		    });

		    if (isSuperset === true) matches.push(element);
		    //elTags.forEach(function (tag) {
		      //function containsAny(source,target){
		        //target = target.map(a => a.tag);
		        //var result = source.filter(function(item){ return
		        //target.indexOf(item) > -1});
		        //return (result.length > 0);
		      //}
		      //if(containsAny(selectedTag, elTags)===true){
		        //matches.push(element);
		      //}
		      //if (tag["tag"] === selectedTag.trim()) matches.push(element)
					//selectedTag.forEach(function(el){
					//	if (tag["tag"] === el)
		      // matches.push(element);
					//});

		    //});
		  });
		  return matches;
		}

		// render the section of the page that
		// lists the tags
		function drawTags(data) {
		  var tag = existingTagsList(data);
		  var contents = ich.tags({
		    rows: tag
		  });
		  $('#tags').html(contents);
		}

		// render the page title with its
		// article count
		function pageTitle(data) {
			var amount = data.length;
			var contents = ich.title({
		  	numArticles: amount
			});
		$('#title').html(contents);
		}

		// takes off the time from the dates
		function cleanDates(data) {
			data.forEach(function (item) {
				item.date = item.date.split(" at")[0];
			});
		return data;
		}
