import PyPDF2, re, sys
from sets import Set
parseFile = ''.join(sys.argv[1])
whatIfPDF = open(parseFile, 'rb')
WhatIfReader = PyPDF2.PdfFileReader(whatIfPDF)
allCourses = set([])
for i in range (0, WhatIfReader.numPages):
	page = WhatIfReader.getPage(i)
	courses = re.findall(r"(FALL.*?\d[.]\d\d|SPR.*?\d[.]\d\d|SUM.*?\d[.]\d\d)",page.extractText())
	for y in range (0, len(courses)):
		courseBreakdown = re.search(r"(FALL|SPR|SUM)\s(\d\d\d\d)([A-Z][A-Z][A-Z]\d\d\d\d)(.*?)(A|A-|B|B[+-]|C|C[+-]|D|D[+-]|F|P|DR|TR)(\d+.\d\d)", courses[y])
		if courseBreakdown:
			semester = courseBreakdown.group(1)
			if semester == "FALL":
				semester = "Fall"
			elif semester == "SPR":
				semester = "Spring"
			elif semester == "SUM":
				semester = "Summer"
			year = courseBreakdown.group(2)
			course = courseBreakdown.group(3)
			courseDescription = courseBreakdown.group(4)
				
			if courseDescription[0]== "L" and  not courseDescription.istitle():
				course = course + "L"
				courseDescription = courseDescription[1:]
					
			grade = courseBreakdown.group(5)
			credits = courseBreakdown.group(6)
			allCourses.add((semester, year, course, courseDescription, grade, credits))
for course in allCourses:
	print course[0] + "$$&&" + course[1] + "$$&&" + course[2] + "$$&&" + course[3] + "$$&&" + course[4] + "$$&&" + course[5]
