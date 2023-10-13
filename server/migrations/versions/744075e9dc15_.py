"""empty message

Revision ID: 744075e9dc15
Revises: ec40c4bf1eab
Create Date: 2023-10-11 10:26:10.238339

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '744075e9dc15'
down_revision = 'ec40c4bf1eab'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('answers', schema=None) as batch_op:
        batch_op.add_column(sa.Column('answer1', sa.String(), nullable=True))
        batch_op.add_column(sa.Column('answer2', sa.String(), nullable=True))
        batch_op.add_column(sa.Column('answer3', sa.String(), nullable=True))
        batch_op.add_column(sa.Column('correct', sa.String(), nullable=True))
        batch_op.drop_column('answer_two')
        batch_op.drop_column('answer_one')
        batch_op.drop_column('correct_answer')
        batch_op.drop_column('answer_three')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('answers', schema=None) as batch_op:
        batch_op.add_column(sa.Column('answer_three', sa.VARCHAR(), nullable=True))
        batch_op.add_column(sa.Column('correct_answer', sa.VARCHAR(), nullable=True))
        batch_op.add_column(sa.Column('answer_one', sa.VARCHAR(), nullable=True))
        batch_op.add_column(sa.Column('answer_two', sa.VARCHAR(), nullable=True))
        batch_op.drop_column('correct')
        batch_op.drop_column('answer3')
        batch_op.drop_column('answer2')
        batch_op.drop_column('answer1')

    # ### end Alembic commands ###