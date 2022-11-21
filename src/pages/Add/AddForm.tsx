import { useFormik } from 'formik';
import { useState, useEffect } from 'react';
import { Form, useFormStore } from 'react-hero-form';
import { createAffair } from '../../services/api/Affair';
import { Affair } from '../../utils/Affair';
import { TypePicker } from './TypePicker';

let times = -1;
export const AddForm = (props: { isModify?: boolean; affair?: Affair | undefined }) => {
  const [fresh, useFresh] = useState(true);
  const [isModify, setisModify] = useState(false);


  console.log(props.affair);
  const store = useFormStore(
    props.affair !== undefined
      ? {
          name: props.affair!.name,
          typeId: -1,
          content: props.affair!.content,
          deadline: JSON.stringify(props.affair!.deadline),
          continuePeriod_min: props.affair!.continuePeriod_min,
          times: props.affair!.times,
          isImportant: props.affair!.isImportant,
          doAlarm: props.affair!.doAlarm,
        }
      : {
          name: '123',
          typeId: -1,
          content: '',
          deadline: '',
          continuePeriod_min: 2,
          times: -1,
          isImportant: false,
          doAlarm: false,
        }
  );

  const forceUpdate = () => {
    useFresh(false);
    setTimeout(() => {
      useFresh(true);
    }, 0);
  };

  const clear = () => {
    store.reset();
    forceUpdate();
  };

  const onSubmit = (e: any) => {
    e.preventDefault();

    const values = store.get();
    if (values.times) {
      values.times = Number(values.times);
    }
    console.log(values);
    createAffair({
      name: values.name,
      typeId: values.typeId,
      content: values.content ?? '',
      deadline: values.deadline ?? 0,
      continuePeriod_min: values.continuePeriod_min ?? 2,
      times: values.times ?? -1,
      isImportant: values.isImportant ?? false,
      doAlarm: values.doAlarm ?? false,
    })
      .then((e: any) => {
        console.log(e);
        clear();
      })
      .catch((e: any) => {
        console.log(e);
      });
  };

  // https://github.com/varHarrie/react-hero-form
  return (
    <div>
      {fresh && (
        <Form store={store} className="block space-y-4">
          <Form.Field name="name">
            <label className="block text-sm font-medium text-gray-700" defaultValue={store.get('name')}>
              名字
              <input
                name="name"
                type="text"
                className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </label>
          </Form.Field>
          <Form.Field name="type">
            <label className="block text-sm font-medium text-gray-700">
              类别
              <TypePicker
                onChange={e => {
                  store.set('typeId', e);
                }}
                value={store.get('typeId')}
                defaultValue={store.get('typeId')}
              />
              {/*
            <input list="type" type="text" className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
            <datalist id="type">
              {types.map((type: any) => {
                return <option value={type.id}>{type.name}</option>;
              })}
            </datalist>
            */}
              {/*
            <select className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
              {types.map((type: any) => {
                return <option value={type.id}>{type.name}</option>;
              })}
              <option>+添加</option>
            </select>
            */}
            </label>
          </Form.Field>
          <Form.Field name="times">
            <div className="flex space-x-5">
              <label className="ml-3 flex align-middle text-base font-medium text-gray-700">
                <input name="times" value={1} defaultChecked={store.get('times') === 1} type="radio" className="h-6 w-6 mr-1 border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                一次
              </label>
              <label className="ml-3 flex align-middle text-base font-medium text-gray-700">
                <input name="times" value={-1} defaultChecked={store.get('times') === -1} type="radio" className="h-6 w-6 mr-1 border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                多次
              </label>
              <label className="ml-3 flex align-middle text-base font-medium text-gray-700">
                <input name="times" value={times} defaultChecked={store.get('times') > 1} type="radio" className="h-6 w-6 mr-1 border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                <input
                  className="w-10 border-b border-b-gray-500"
                  onChange={e => {
                    times = Number(e.target.value);
                  }}
                />
                次
              </label>
            </div>
          </Form.Field>
          <div className="flex space-x-5">
            <Form.Field name="isImportant">
              <label className="font-medium text-gray-700 flex align-middle">
                <input type="checkbox" defaultChecked={store.get('isImportant')} className="h-6 w-6 mr-1 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                重要
              </label>
            </Form.Field>
            <Form.Field name="doAlarm">
              <label className="font-medium text-gray-700 flex align-middle">
                <input type="checkbox" defaultChecked={store.get('doAlarm')} className="h-6 w-6 mr-1 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                提醒
              </label>
            </Form.Field>
          </div>

          <Form.Field name="deadline">
            <label className="block text-sm font-medium text-gray-700">
              Deadline
              <input
                type="datetime-local"
                defaultValue={store.get('deadline')}
                className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </label>
          </Form.Field>
          <Form.Field name="continuePeriod_min">
            <label className="block text-sm font-medium text-gray-700">
              持续时间
              <div className="flex align-middle">
                <input
                  type="text"
                  defaultValue={store.get('continuePeriod_min')}
                  className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                <span className="py-2">h</span>
              </div>
            </label>
          </Form.Field>
          <Form.Field name="content">
            <label className="block text-sm font-medium text-gray-700">
              详细
              <textarea defaultValue={store.get('content')} className="mt-1  w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"></textarea>
            </label>
          </Form.Field>
          <Form.Field>
            <div className="flex justify-center">
              <button onClick={onSubmit} className="btn-blue btn-blue-ring">
                添加
              </button>
            </div>
          </Form.Field>
        </Form>
      )}
    </div>
  );
};
