import xlrd
import csv


data_files=['API_ARG_DS2_en_excel_v2_868196.xls','API_AUS_DS2_en_excel_v2_868286.xls','API_BRA_DS2_en_excel_v2_867196.xls','API_CAN_DS2_en_excel_v2_868024.xls','API_CHL_DS2_en_excel_v2_869731.xls','API_CHN_DS2_en_excel_v2_867313.xls','API_COG_DS2_en_excel_v2_867668.xls','API_CUB_DS2_en_excel_v2_872726.xls','API_DEU_DS2_en_excel_v2_872102.xls','API_DZA_DS2_en_excel_v2_867874.xls','API_FRA_DS2_en_excel_v2_867872.xls','API_GBR_DS2_en_excel_v2_868103.xls','API_GRC_DS2_en_excel_v2_872185.xls','API_IND_DS2_en_excel_v2_867679.xls','API_ITA_DS2_en_excel_v2_871326.xls','API_JPN_DS2_en_excel_v2_867310.xls','API_KEN_DS2_en_excel_v2_867624.xls','API_LBY_DS2_en_excel_v2_868015.xls','API_MEX_DS2_en_excel_v2_867091.xls','API_RUS_DS2_en_excel_v2_868882.xls','API_SAU_DS2_en_excel_v2_874205.xls','API_SWE_DS2_en_excel_v2_867263.xls','API_USA_DS2_en_excel_v2_867200.xls','API_VEN_DS2_en_excel_v2_867177.xls']
indicator_names=["GDP (current US$)","Current health expenditure (% of GDP)","Military expenditure (% of GDP)","Government expenditure on education, total (% of GDP)"]
indicator_codes=["NY.GDP.MKTP.CD","SH.XPD.CHEX.GD.ZS","MS.MIL.XPND.GD.ZS","SE.XPD.TOTL.GD.ZS"]

countries=[]
country_codes=[]
country_id = 0

# File descriptors

year_file= open('year.csv','w',newline='')
year_writer=csv.writer(year_file,delimiter=',' )
year_id=0

indicator_file= open('indicator.csv','w',newline='')
indicator_writer=csv.writer(indicator_file,delimiter=',' )
indicator_id=0

measurements_file= open('measurement.csv','w',newline='')
measurements_writer=csv.writer(measurements_file,delimiter=',' )

country_file= open('country.csv','w',newline='')
country_writer=csv.writer(country_file,delimiter=',' )

row= ['y_id','year','5yr','10yr','20yr']
year_writer.writerow(row)


for year in range(1960,2020,1):  
     time_diff = year -1960
     five_year= time_diff // 5
     ten_year= time_diff // 10
     twenty_year =time_diff // 20
     row= [year_id,year,five_year,ten_year,twenty_year]
     year_writer.writerow(row)
     year_id = year_id + 1

year_file.close()


row= ['i_id','indicator_name','i_code']
indicator_writer.writerow(row)

for i in range(len(indicator_names)):
     indicator_with_comma=indicator_names[i].split(',')
     indicator_clear=''
     for j in range(len(indicator_with_comma)):
          indicator_clear=indicator_clear+indicator_with_comma[0]+""
     row= [indicator_id,indicator_clear,indicator_codes[i]]#indicator_names[i]
     indicator_writer.writerow(row)
     indicator_id = indicator_id + 1
indicator_file.close()


row= ['c_id','country','country_code']
country_writer.writerow(row)

row= ['c_id','y_id','i_id','measure']
measurements_writer.writerow(row)

for file in range(len(data_files)):
     workbook = xlrd.open_workbook(data_files[file])
     worksheet_data = workbook.sheet_by_index(0)
     country=worksheet_data.cell_value(10,0)
     country_code=worksheet_data.cell_value(10,1)
     
     for row in range(4,worksheet_data.nrows):
          if (worksheet_data.cell_value(row,3) in indicator_codes):
               index = indicator_codes.index(worksheet_data.cell_value(row,3))
               for col in range(4,worksheet_data.ncols):
                    measure = worksheet_data.cell_value(row,col)
                    if(measure):
                         row_write = [country_id,col-4,index,measure]
                         measurements_writer.writerow(row_write)

     country_row = [country_id,country,country_code]
     country_writer.writerow(country_row)          
     country_id = country_id + 1


country_file.close()
measurements_file.close()



















               
    
    
