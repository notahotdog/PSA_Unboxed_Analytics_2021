from fbprophet import Prophet
import pandas as pd
import matplotlib as mpl
import matplotlib.pyplot as plt
import numpy as np
from sklearn.metrics import mean_squared_error

def timeseriesit(df,string):
    timeseries = df
    timeseries['Day'] = pd.to_datetime(pd.to_datetime(timeseries.ATD1).dt.strftime("%Y-%m-%d"))
    grouped_day = timeseries.groupby(['Day'], as_index=False).agg({"SUMOFBOX_Q": "sum","SUMOFTEU_Q":"sum"})
    if (string == 'all'):
        return grouped_day
    else:
        earliest = loadgrouped_day.head(1)['Day'].dt.strftime('%Y-%m-%d').values[0]
        latest = loadgrouped_day.tail(1)['Day'].dt.strftime('%Y-%m-%d').values[0]
        idx = pd.date_range(earliest, latest)
        filtered_df = timeseries[timeseries['SERVICE_C1'] == string]
        grouped_day = filtered_df.groupby(['Day'], as_index=False).agg({"SUMOFBOX_Q": "sum","SUMOFTEU_Q":"sum"})
        grouped_day = grouped_day.set_index('Day')
        grouped_day = grouped_day.reindex(idx, fill_value=0)
        return grouped_day

def forecast(string):
        data17_19 = pd.read_csv('merged.csv')
        load = data17_19[data17_19['EVENT_C']=='LOAD']
        disc = data17_19[data17_19['EVENT_C']=='DISC']
        loadgrouped_day= timeseriesit(load,string)
        discgrouped_day= timeseriesit(disc,string)
        loadtrain = loadgrouped_day.rename(columns={'Day':'ds','SUMOFBOX_Q':'y'}).drop(columns='SUMOFTEU_Q')
        disctrain = discgrouped_day.rename(columns={'Day':'ds','SUMOFBOX_Q':'y'}).drop(columns='SUMOFTEU_Q')
        m1 = Prophet()
        m1.add_country_holidays(country_name='US')
        m1.fit(loadtrain)
        m2 = Prophet()
        m2.add_country_holidays(country_name='US')
        m2.fit(disctrain)
        future1 = m1.make_future_dataframe(periods=62)
        forecast1 = m1.predict(future1)
        future2 = m2.make_future_dataframe(periods=62)
        forecast2 = m2.predict(future2)
        overall = [sum(x) for x in zip(*[forecast1.tail(62).yhat.tolist(),forecast2.tail(62).yhat.tolist()])]
        lower = [sum(x) for x in zip(*[forecast1.tail(62).yhat_lower.tolist(),forecast2.tail(62).yhat_lower.tolist()])]
        upper = [sum(x) for x in zip(*[forecast1.tail(62).yhat_upper.tolist(),forecast2.tail(62).yhat_upper.tolist()])]
        #result = pd.DataFrame({'ds': forecast1.tail(62).ds.tolist(),'yhat': overall,'lower' : lower,'upper' : upper})
        result = pd.DataFrame({'ds': forecast1.tail(62).ds.dt.strftime('%Y-%m-%d').tolist(),'yhat': overall,'lower' : lower,'upper' : upper})
        return result

dataframe = forecast('all')
json_data = dataframe.to_json(orient="records")
print(json_data)
