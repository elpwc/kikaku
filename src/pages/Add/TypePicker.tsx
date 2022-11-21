import { useEffect, useState } from 'react';
import { createAffairType, findAllAffairType } from '../../services/api/AffairType';
import { AffairType } from '../../utils/AffairType';

interface Props {
  onChange?: (typeId: number) => void;
  value?: number;
  defaultValue?: number;
}

const TypeItem = (props: { checked: boolean; children: AffairType; onClick: (e: number) => void }) => {
  return (
    <div
      onClick={() => {
        props.onClick(props.children.id);
      }}
      className={`rounded w-fit px-1 my-0.5 bg-yellow-300 text-yellow-700 border-2 transition-all hover:bg-yellow-200 ${props.checked ? 'border-yellow-700' : 'border-transparent'}`}
    >
      <p>{props.children.name}</p>
    </div>
  );
};

export const TypePicker = (props: Props) => {
  const [selected, setselected] = useState(props.defaultValue ?? -1);
  const [inputValue, setinputValue] = useState('');
  const [types, settypes] = useState([]);

  useEffect(() => {
    findAllAffairType().then(e => {
      console.log(e);
      settypes(e.data.affairTypes);
    });
  }, []);

  useEffect(() => {
    if (props.value) {
      setselected(props.value);
    }
  }, [props.value]);

  return (
    <div>
      <div className="flex flex-wrap space-x-1">
        {types.map((type: AffairType) => {
          return (
            <TypeItem
              checked={selected === type.id}
              onClick={e => {
                setselected(e);
                props.onChange?.(e);
              }}
              key={type.id}
            >
              {type}
            </TypeItem>
          );
        })}
      </div>

      <div className="flex">
        <input
          value={inputValue}
          onChange={e => {
            setinputValue(e.target.value);
          }}
          className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        <button
          className="btn-blue"
          onClick={e => {
            e.preventDefault();

            createAffairType({ name: inputValue }).then(res => {
              console.log(res);

              findAllAffairType().then(e => {
                console.log(e);
                settypes(e.data.affairTypes);
                setselected(res.id);
              });
            });
          }}
        >
          +
        </button>
      </div>
    </div>
  );
};
