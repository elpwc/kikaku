import { Formik, Form, Field } from 'formik';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { createAffair, removeAffair, updateAffair } from '../../services/api/Affair';
import { Affair } from '../../utils/Affair';
import { TypePicker } from './TypePicker';
import { Button, Modal } from 'flowbite-react';

let times = '-1';
export const AddForm = (props: { isModify?: boolean; affair?: Affair | undefined; onSubmit: () => void }) => {
  const defaultValues = {
    name: '123',
    content: '',
    deadline: '',
    continuePeriod_min: 2,
    times: '-1',
    isImportant: false,
    doAlarm: false,
  };

  const [selectedTypeId, setselectedTypeId] = useState(-1);
  //const [times, settimes] = useState('2');
  const [deleteModalVis, setdeleteModalVis] = useState(false);
  const [initialValues, setinitialValues]: [Affair | undefined | any, any] = useState(defaultValues);

  const navigate = useNavigate();

  useEffect(() => {
    console.log(props.affair);
    if (props.affair) {
      console.log(props.affair);
      if (props.affair.type?.id) {
        setselectedTypeId(props.affair.type.id);
      }
      times = props.affair.times.toString();
      //settimes(props.affair.times.toString());
      setinitialValues({
        name: props.affair!.name,
        content: props.affair!.content,
        deadline: props.affair!.deadline === null ? '' : props.affair!.deadline.toString().substring(0, props.affair!.deadline.toString().length - 1),
        continuePeriod_min: props.affair!.continuePeriod_min,
        times: props.affair!.times.toString(),
        isImportant: props.affair!.isImportant,
        doAlarm: props.affair!.doAlarm,
      });
    } else {
      setinitialValues(defaultValues);
      setselectedTypeId(-1);
    }
  }, [props.affair]);

  console.log(props.affair, initialValues);

  return (
    <Formik
      /* 加了才会重复更新 */
      enableReinitialize
      initialValues={initialValues}
      onSubmit={async (values, { resetForm }) => {
        console.log(values);
        if (values.times) {
          values.times = Number(values.times);
        }
        console.log(values);

        if (props.isModify) {
          // 修改

          updateAffair(
            { id: props.affair?.id.toString() ?? '-1' },
            {
              name: values.name,
              typeId: selectedTypeId,
              content: values.content ?? '',
              deadline: values.deadline ?? 0,
              continuePeriod_min: values.continuePeriod_min ?? 2,
              times: values.times ? Number(values.times) : -1,
              isImportant: values.isImportant ?? false,
              doAlarm: values.doAlarm ?? false,
            }
          )
            .then((e: any) => {
              console.log(e);
              props.onSubmit();
              resetForm();
            })
            .catch((e: any) => {
              console.log(e);
            });
        } else {
          // 添加
          createAffair({
            name: values.name,
            typeId: selectedTypeId,
            content: values.content ?? '',
            deadline: values.deadline ?? null,
            continuePeriod_min: values.continuePeriod_min ?? 2,
            times: values.times ? Number(values.times) : -1,
            isImportant: values.isImportant ?? false,
            doAlarm: values.doAlarm ?? false,
          })
            .then((e: any) => {
              console.log(e);
              props.onSubmit();
              resetForm();
            })
            .catch((e: any) => {
              console.log(e);
            });
        }
      }}
    >
      {({ values, resetForm }) => (
        <Form className="block space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            名字
            <Field id="name" name="name" className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
          </label>

          <label className="block text-sm font-medium text-gray-700">
            类别
            <TypePicker
              onChange={e => {
                setselectedTypeId(e);
              }}
              value={selectedTypeId}
            />
          </label>

          <div className="flex space-x-5">
            <label className="ml-3 flex align-middle text-base font-medium text-gray-700">
              <Field type="radio" name="times" value="1" className="h-6 w-6 mr-1 border-gray-300 text-indigo-600 focus:ring-indigo-500" />
              一次
            </label>
            <label className="ml-3 flex align-middle text-base font-medium text-gray-700">
              <Field type="radio" name="times" value="-1" className="h-6 w-6 mr-1 border-gray-300 text-indigo-600 focus:ring-indigo-500" />
              多次
            </label>
            <label className="ml-3 flex align-middle text-base font-medium text-gray-700">
              <Field type="radio" name="times" value={Number(times) < 2 ? '2' : times} className="h-6 w-6 mr-1 border-gray-300 text-indigo-600 focus:ring-indigo-500" />
              <input
                className="w-10 border-b border-b-gray-500"
                onChange={e => {
                  //settimes(e.target.value);
                  times = e.target.value;
                }}
                value={Number(times) < 2 ? '2' : times}
                defaultValue={Number(times) < 2 ? '2' : times}
              />
              次
            </label>
          </div>

          <div className="flex space-x-5">
            <label className="font-medium text-gray-700 flex align-middle">
              <Field type="checkbox" name="isImportant" className="h-6 w-6 mr-1 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
              重要
            </label>
            <label className="font-medium text-gray-700 flex align-middle">
              <Field type="checkbox" name="doAlarm" className="h-6 w-6 mr-1 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
              提醒
            </label>
          </div>

          <label className="block text-sm font-medium text-gray-700">
            Deadline
            <Field name="deadline" type="datetime-local" className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
          </label>

          <label className="block text-sm font-medium text-gray-700">
            持续时间
            <Field name="continuePeriod_min" className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
          </label>
          <label className="block text-sm font-medium text-gray-700">
            详细
            <Field name="content" as="textarea" className="mt-1  w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
          </label>

          <div className="flex justify-around">
            <button type="submit" className="btn-blue btn-blue-ring">
              {props.isModify ? '修改' : '添加'}
            </button>
            {props.isModify && (
              <>
                <button
                  onClick={e => {
                    e.preventDefault();

                    setdeleteModalVis(true);
                  }}
                  className="btn-blue btn-blue-ring"
                >
                  删除
                </button>

                <Modal show={deleteModalVis} size="md" popup={true} onClose={() => {}}>
                  <Modal.Header />
                  <Modal.Body>
                    <div className="text-center">
                      <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">确定删除{props.affair?.name}吗？</h3>
                      <div className="flex justify-center gap-4">
                        <Button
                          color="failure"
                          onClick={() => {
                            removeAffair({ id: props.affair?.id.toString() ?? '-1' }).then(e => {
                              resetForm();
                              navigate('/add');
                              setdeleteModalVis(false);
                            });
                          }}
                        >
                          确定
                        </Button>
                        <Button
                          color="gray"
                          onClick={() => {
                            setdeleteModalVis(false);
                          }}
                        >
                          取消
                        </Button>
                      </div>
                    </div>
                  </Modal.Body>
                </Modal>

                <button
                  onClick={e => {
                    e.preventDefault();
                    resetForm();
                    navigate('/add');
                  }}
                  className="btn-blue btn-blue-ring"
                >
                  返回
                </button>
              </>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
};
