import { screen } from '@testing-library/react';
import { vi } from 'node_modules/vitest/dist/index';
import React from 'react';

import ProductFilter from '@/pages/home/components/ProductFilter';
import { mockUseFilterStore } from '@/utils/test/mockZustandStore';
import render from '@/utils/test/render';

const setMinPriceFn = vi.fn();
const setMaxPriceFn = vi.fn();
const setTitleFn = vi.fn();

beforeEach(() => {});

it('카테고리 목록을 가져온 후 카테고리 필드의 정보들이 올바르게 렌더링된다.', async () => {});

it('상품명을 수정하는 경우 setTitle 액션이 호출된다.', async () => {});

it('카테고리를 클릭 할 경우의 클릭한 카테고리가 체크된다.', async () => {});

it('최소 가격 또는 최대 가격을 수정하면 setMinPrice과 setMaxPrice 액션이 호출된다.', async () => {});
