import test from 'node:test';
import assert from 'node:assert/strict';
import {calculateCart} from '../portal-data.js';
test('prices come from catalog, unknown items ignored',()=>{
 const c=calculateCart([{id:'member12',qty:1,price:1},{id:'unknown',qty:99}]);
 assert.equal(c.subtotal,1600000); assert.equal(c.lines.length,1);
});
test('starter minimum and discount cap',()=>{
 assert.ok(calculateCart([{id:'shaker',qty:1}],'START10').error);
 assert.equal(calculateCart([{id:'member12',qty:1}],' start10 ').total,1440000);
 assert.equal(calculateCart([{id:'member30',qty:1}],'START10').discount,250000);
});
test('partner requires two memberships, excludes products and caps discount',()=>{
 assert.ok(calculateCart([{id:'member12',qty:1},{id:'shaker',qty:2}],'PARTNER20').error);
 const c=calculateCart([{id:'member12',qty:2},{id:'shaker',qty:1}],'PARTNER20');
 assert.equal(c.discount,500000); assert.equal(c.total,3150000);
});
test('unknown coupon gives no discount, quantity bounded, empty cart safe',()=>{
 const c=calculateCart([{id:'shaker',qty:100}],'INVALID');
 assert.equal(c.lines[0].qty,20); assert.equal(c.discount,0); assert.ok(c.error);
 assert.equal(calculateCart([]).total,0);
});
