from hijridate import Gregorian, Hijri

def convert(year,month,day):
    Hijri_date = Gregorian(year,month,day).to_hijri()
    hijri_month = Hijri_date.month_name()
    return str(Hijri_date.year), hijri_month, Hijri_date.day