import voucherRepository from '../../src/repositories/voucherRepository.js';
import * as service from '../../src/services/voucherService.js';
import * as errorUtils from '../../src/utils/errorUtils';
import { jest } from '@jest/globals';

describe("voucherService test suite", () => {
  it("should create a voucher", async () => {
    const voucher = {id: 1, code: 'A4D3D5', discount: 20, used: false};
    jest.spyOn(voucherRepository, 'getVoucherByCode').mockResolvedValueOnce(null);
    jest.spyOn(voucherRepository, 'createVoucher').mockResolvedValueOnce(voucher);

    await service.default.createVoucher(voucher.code, voucher.discount);
    expect(voucherRepository.createVoucher).toBeCalledTimes(1);
  })
    
  it("should not create a voucher", async () => {
    const voucher = {id: 1, code: 'A4D3D5', discount: 20, used: false};
    jest.spyOn(voucherRepository, 'getVoucherByCode').mockResolvedValueOnce(voucher);

    expect(service.default.createVoucher(voucher.code, voucher.discount)).rejects.toEqual(errorUtils.conflictError("Voucher already exist."))
  });

  it("should apply voucher", async () => {
    const voucher = {id: 1, code: 'A4D3D5', discount: 20, used: false};
    jest.spyOn(voucherRepository, 'getVoucherByCode').mockResolvedValueOnce(voucher);
    jest.spyOn(voucherRepository, 'useVoucher').mockResolvedValueOnce({...voucher, used: true});
    
  })
})