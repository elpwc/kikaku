import { useState } from 'react';
import { Form, useFormStore } from 'react-hero-form';

let times = -1;
export const AddForm = () => {
  const store = useFormStore();

  const onSubmit = (e: any) => {
    e.preventDefault();

    const values = store.get();
    if (values.times) {
      values.times = Number(values.times);
    }
    console.log(values);
  };

  // https://github.com/varHarrie/react-hero-form
  return (
    <div>
      <Form store={store} className="block space-y-4">
        <Form.Field name="name">
          <label className="block text-sm font-medium text-gray-700">
            名字
            <input name="name" type="text" className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
          </label>
        </Form.Field>
        <Form.Field name="type">
          <label className="block text-sm font-medium text-gray-700">
            类别
            <select className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
              <option>+添加</option>
            </select>
          </label>
        </Form.Field>
        <Form.Field name="times">
          <div className="flex space-x-5">
            <label className="ml-3 flex align-middle text-base font-medium text-gray-700">
              <input name="times" value={1} type="radio" className="h-6 w-6 mr-1 border-gray-300 text-indigo-600 focus:ring-indigo-500" />
              一次
            </label>
            <label className="ml-3 flex align-middle text-base font-medium text-gray-700">
              <input name="times" value={-1} type="radio" className="h-6 w-6 mr-1 border-gray-300 text-indigo-600 focus:ring-indigo-500" />
              多次
            </label>
            <label className="ml-3 flex align-middle text-base font-medium text-gray-700">
              <input name="times" value={times} type="radio" className="h-6 w-6 mr-1 border-gray-300 text-indigo-600 focus:ring-indigo-500" />
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
              <input type="checkbox" className="h-6 w-6 mr-1 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
              重要
            </label>
          </Form.Field>
          <Form.Field name="doAlarm">
            <label className="font-medium text-gray-700 flex align-middle">
              <input type="checkbox" className="h-6 w-6 mr-1 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
              提醒
            </label>
          </Form.Field>
        </div>

        <Form.Field name="deadline">
          <label className="block text-sm font-medium text-gray-700">
            Deadline
            <input type="datetime-local" className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
          </label>
        </Form.Field>
        <Form.Field name="continuePeriod_min">
          <label className="block text-sm font-medium text-gray-700">
            持续时间
            <div className="flex align-middle">
              <input type="text" className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
              <span className="py-2">h</span>
            </div>
          </label>
        </Form.Field>
        <Form.Field name="content">
          <label className="block text-sm font-medium text-gray-700">
            详细
            <textarea className="mt-1  w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"></textarea>
          </label>
        </Form.Field>
        <Form.Field>
          <div className="flex justify-center">
            <button onClick={onSubmit} className="px-10 py-2 text-white  font-normal bg-blue-500 ring ring-blue-400 rounded">
              添加
            </button>
          </div>
        </Form.Field>
      </Form>
    </div>
  );
};
