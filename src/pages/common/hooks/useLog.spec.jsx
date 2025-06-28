import { renderHook } from '@testing-library/react';

import useLog from './useLog';

import { api } from '@/helpers/axios';
import { mockUseUserStore } from '@/utils/test/mockZustandStore';

describe('login이 되어있는 경우', () => {
  beforeEach(() => {
    mockUseUserStore({ user: { id: 10 } });
  });

  it('sendInfoLog()를 호출하면 userId, INFO 레벨, message가 담겨 API가 호출된다', () => {
    vi.spyOn(api, 'post');
    const { result } = renderHook(() => useLog());
    result.current.sendInfoLog('test message');

    expect(api.post).toHaveBeenNthCalledWith(1, '/log', {
      level: 'INFO',
      message: '"test message"',
      userId: 10,
    });
  });

  it('sendErrorLog()를 호출하면 userId, ERROR 레벨, message가 담겨 API가 호출된다', () => {
    vi.spyOn(api, 'post');
    const { result } = renderHook(() => useLog());
    result.current.sendErrorLog('test message');

    expect(api.post).toHaveBeenNthCalledWith(1, '/log', {
      level: 'ERROR',
      message: '"test message"',
      userId: 10,
    });
  });
});

describe('login이 되어있지 않은 경우', () => {
  it('sendInfoLog()를 호출하면 API는 호출되지 않는다', () => {
    vi.spyOn(api, 'post');
    const { result } = renderHook(() => useLog());
    result.current.sendInfoLog('test message');

    expect(api.post).not.toHaveBeenCalled();
  });

  it('sendErrorLog()를 호출하면 API는 호출되지 않는다', () => {
    vi.spyOn(api, 'post');
    const { result } = renderHook(() => useLog());
    result.current.sendErrorLog('test message');

    expect(api.post).not.toHaveBeenCalled();
  });
});
